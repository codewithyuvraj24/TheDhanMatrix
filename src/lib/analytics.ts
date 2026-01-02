export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        ; (window as any).gtag('config', GA_TRACKING_ID, {
            page_path: url,
        })
    }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: { action: string, category: string, label: string, value?: number }) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        ; (window as any).gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        })
    }
}

export type PredictionRequest = {
    capital: number
    months?: number
    historical_returns?: number[]
}

export type PredictionResponse = {
    predicted_value: number
    annual_yield_percent: number
    confidence_low: number
    confidence_high: number
    message: string
}

const isProd = process.env.NODE_ENV === 'production'
// On Vercel, we use the relative path mapped in vercel.json. Locally, we use port 8000.
const AI_CORE_URL = process.env.NEXT_PUBLIC_AI_CORE_URL || (isProd ? '/py-api' : 'http://localhost:8000')

export async function getAIPrediction(request: PredictionRequest): Promise<PredictionResponse | null> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000) // 8s timeout

    try {
        const response = await fetch(`${AI_CORE_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                capital: request.capital,
                months: request.months || 12,
                historical_returns: request.historical_returns || [0.12, 0.15, 0.18, 0.14, 0.16]
            }),
            signal: controller.signal,
            next: { revalidate: 3600 }
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
            throw new Error('AI Core connection failed')
        }

        return await response.json()
    } catch (error: any) {
        clearTimeout(timeoutId)
        if (error.name === 'AbortError') {
            console.error('Matrix Prophet AI Core Timeout - Service Unreachable')
        } else {
            console.error('Matrix Prophet AI Bridge Error:', error)
        }
        return null
    }
}

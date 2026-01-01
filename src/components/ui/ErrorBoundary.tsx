"use client"

import { Component, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
    error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: any) {
        console.error('ErrorBoundary caught an error:', error, errorInfo)

        // Send to Sentry if available
        if (typeof window !== 'undefined' && (window as any).Sentry) {
            (window as any).Sentry.captureException(error, { extra: errorInfo })
        }
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return (
                <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-[#050505]">
                    <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-white/10 p-8 sm:p-12 text-center">
                        <div className="w-20 h-20 bg-red-500/10 text-red-600 dark:text-red-400 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle size={40} strokeWidth={2.5} />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-4">
                            Something went wrong
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 font-medium mb-8 leading-relaxed">
                            We encountered an unexpected error. Our team has been notified and we're working on a fix.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-3 active:scale-95"
                        >
                            <RefreshCw size={20} strokeWidth={3} />
                            <span>Reload Page</span>
                        </button>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mt-8 text-left">
                                <summary className="text-xs font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-slate-600 dark:hover:text-slate-300">
                                    Error Details
                                </summary>
                                <pre className="mt-4 p-4 bg-slate-100 dark:bg-white/5 rounded-xl text-xs text-red-600 dark:text-red-400 overflow-auto">
                                    {this.state.error.toString()}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

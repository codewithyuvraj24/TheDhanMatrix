"use client"
import React from 'react'

interface SkeletonProps {
    className?: string
}

export function Skeleton({ className = "" }: SkeletonProps) {
    return (
        <div
            className={`animate-pulse bg-gray-200 rounded-md ${className}`}
            style={{ animationDuration: '1.5s' }}
        />
    )
}

export function StatsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow border border-gray-100">
                    <Skeleton className="h-4 w-24 mb-4" />
                    <Skeleton className="h-10 w-32 mb-2" />
                    <Skeleton className="h-3 w-40" />
                </div>
            ))}
        </div>
    )
}

export function ChartSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow border border-gray-100">
                    <Skeleton className="h-6 w-48 mb-6" />
                    <Skeleton className="h-[300px] w-full" />
                </div>
            ))}
        </div>
    )
}

export function TableSkeleton() {
    return (
        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-10 w-32" />
            </div>
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex gap-4 items-center py-4 border-b border-gray-50 last:border-0">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-3 w-1/2" />
                        </div>
                        <Skeleton className="h-8 w-24" />
                    </div>
                ))}
            </div>
        </div>
    )
}

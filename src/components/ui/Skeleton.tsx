"use client"
import React from 'react'

interface SkeletonProps {
    className?: string
}

export function Skeleton({ className = "" }: SkeletonProps) {
    return (
        <div
            className={`animate-pulse bg-slate-200/50 dark:bg-white/10 rounded-md ${className}`}
            style={{ animationDuration: '2s' }}
        />
    )
}

export function StatsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white dark:border-white/10">
                    <Skeleton className="h-12 w-12 rounded-2xl mb-6" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 bg-white/70 dark:bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white dark:border-white/10">
                <Skeleton className="h-8 w-48 mb-10 rounded-xl" />
                <Skeleton className="h-[300px] w-full rounded-2xl" />
            </div>
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white dark:border-white/10">
                <Skeleton className="h-8 w-48 mb-10 rounded-xl" />
                <Skeleton className="h-[300px] w-full rounded-full" />
            </div>
        </div>
    )
}

export function TableSkeleton() {
    return (
        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white dark:border-white/10 mt-8">
            <div className="flex justify-between items-center mb-10">
                <Skeleton className="h-8 w-64 rounded-xl" />
                <Skeleton className="h-12 w-48 rounded-2xl" />
            </div>
            <div className="space-y-8">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex gap-6 items-center pb-8 border-b border-slate-100 dark:border-white/5 last:border-0 last:pb-0">
                        <Skeleton className="h-14 w-14 rounded-2xl" />
                        <div className="flex-1 space-y-3">
                            <Skeleton className="h-4 w-1/4 rounded" />
                            <Skeleton className="h-3 w-1/2 rounded" />
                        </div>
                        <Skeleton className="h-10 w-24 rounded-xl" />
                    </div>
                ))}
            </div>
        </div>
    )
}

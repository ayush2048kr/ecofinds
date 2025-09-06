import React from 'react';

const LoadingPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo skeleton */}
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
                            <div className="ml-2 w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
                        </div>

                        {/* Search bar skeleton */}
                        <div className="flex-1 max-w-lg mx-8">
                            <div className="w-full h-10 bg-gray-300 rounded-lg animate-pulse"></div>
                        </div>

                        {/* Cart and user icons skeleton */}
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
                            <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Sidebar - Points to Remember & Filters */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Points to Remember Card */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="w-32 h-6 bg-gray-300 rounded animate-pulse mb-4"></div>
                            <div className="space-y-3">
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <div key={item} className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                                ))}
                            </div>
                        </div>

                        {/* Filter Categories */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="w-24 h-6 bg-gray-300 rounded animate-pulse mb-4"></div>
                            <div className="space-y-3">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="w-full h-12 bg-gray-200 rounded animate-pulse"></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Product Area */}
                    <div className="lg:col-span-3">
                        {/* Banner skeleton */}
                        <div className="bg-white rounded-lg shadow-sm border mb-8 overflow-hidden">
                            <div className="h-48 bg-gradient-to-r from-gray-300 to-gray-200 animate-pulse relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-32 h-8 bg-white/20 rounded animate-pulse mx-auto mb-2"></div>
                                        <div className="w-24 h-6 bg-white/20 rounded animate-pulse mx-auto"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sort, Filter, Group controls */}
                        <div className="flex flex-wrap gap-3 mb-6">
                            <div className="w-16 h-8 bg-gray-300 rounded animate-pulse"></div>
                            <div className="w-16 h-8 bg-gray-300 rounded animate-pulse"></div>
                            <div className="w-20 h-8 bg-gray-300 rounded animate-pulse"></div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div key={item} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                                    {/* Product image skeleton */}
                                    <div className="h-48 bg-gray-300 animate-pulse relative">
                                        <div className="absolute top-2 right-2 w-6 h-6 bg-gray-400 rounded-full animate-pulse"></div>
                                    </div>

                                    {/* Product info skeleton */}
                                    <div className="p-4 space-y-3">
                                        <div className="w-3/4 h-5 bg-gray-300 rounded animate-pulse"></div>
                                        <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="w-1/3 h-6 bg-gray-300 rounded animate-pulse"></div>
                                        <div className="w-full h-9 bg-gray-300 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* All Categories section */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="w-32 h-6 bg-gray-300 rounded animate-pulse mb-6"></div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                    <div key={item} className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Modal Skeleton (when a product would be selected) */}
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity">
                <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Product image */}
                            <div className="h-64 bg-gray-300 rounded animate-pulse"></div>

                            {/* Product details */}
                            <div className="space-y-4">
                                <div className="w-3/4 h-7 bg-gray-300 rounded animate-pulse"></div>
                                <div className="w-1/2 h-5 bg-gray-200 rounded animate-pulse"></div>
                                <div className="w-1/3 h-8 bg-gray-300 rounded animate-pulse"></div>
                                <div className="space-y-2">
                                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="w-4/6 h-4 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                                <div className="w-full h-10 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Loading overlay
            <div className="fixed inset-0 bg-white/80 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-gray-600">Loading awesome products...</p>
                </div>
            </div> */}
        </div>
    );
};

export default LoadingPage;
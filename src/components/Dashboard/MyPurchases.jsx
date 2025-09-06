import React, { useState, useMemo } from 'react';
import { Search, Filter, Package, Truck, CheckCircle, XCircle, Star, Download, MessageSquare } from 'lucide-react';

// Mock data for purchases
const mockPurchases = [
    {
        id: 1,
        orderNumber: 'ORD-2024-001',
        date: '2024-01-15',
        seller: 'TechDeals Pro',
        items: [
            {
                id: 101,
                name: 'MacBook Pro 2019',
                price: 899.99,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=80&h=80&fit=crop&crop=center'
            }
        ],
        totalAmount: 899.99,
        status: 'delivered',
        shippingAddress: '123 Main St, City, State 12345',
        trackingNumber: 'TRK123456789',
        rating: 5,
        reviewed: true
    },
    {
        id: 2,
        orderNumber: 'ORD-2024-002',
        date: '2024-01-20',
        seller: 'Fashion Forward',
        items: [
            {
                id: 201,
                name: 'Designer Handbag',
                price: 89.99,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=80&h=80&fit=crop&crop=center'
            },
            {
                id: 202,
                name: 'Leather Wallet',
                price: 45.99,
                quantity: 1,
                image: 'https://via.placeholder.com/80x80/cccccc/666666?text=Wallet'
            }
        ],
        totalAmount: 135.98,
        status: 'shipped',
        shippingAddress: '456 Oak Ave, City, State 12345',
        trackingNumber: 'TRK987654321',
        rating: null,
        reviewed: false
    },
    {
        id: 3,
        orderNumber: 'ORD-2024-003',
        date: '2024-01-25',
        seller: 'Home Essentials',
        items: [
            {
                id: 301,
                name: 'Coffee Table Set',
                price: 250.00,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=80&h=80&fit=crop&crop=center'
            }
        ],
        totalAmount: 250.00,
        status: 'processing',
        shippingAddress: '789 Pine Rd, City, State 12345',
        trackingNumber: null,
        rating: null,
        reviewed: false
    },
    {
        id: 4,
        orderNumber: 'ORD-2024-004',
        date: '2024-01-10',
        seller: 'StyleVintage',
        items: [
            {
                id: 401,
                name: 'Vintage Leather Jacket',
                price: 125.00,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=80&h=80&fit=crop&crop=center'
            }
        ],
        totalAmount: 125.00,
        status: 'cancelled',
        shippingAddress: '321 Elm St, City, State 12345',
        trackingNumber: null,
        rating: null,
        reviewed: false
    }
];

const MyPurchases = () => {
    const [purchases] = useState(mockPurchases);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date-desc');
    const [selectedPurchase, setSelectedPurchase] = useState(null);

    // Filter and sort purchases
    const filteredAndSortedPurchases = useMemo(() => {
        let result = [...purchases];

        // Filter by search term
        if (searchTerm) {
            result = result.filter(purchase =>
                purchase.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                purchase.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                purchase.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Filter by status
        if (statusFilter !== 'all') {
            result = result.filter(purchase => purchase.status === statusFilter);
        }

        // Sort purchases
        result.sort((a, b) => {
            switch (sortBy) {
                case 'date-desc':
                    return new Date(b.date) - new Date(a.date);
                case 'date-asc':
                    return new Date(a.date) - new Date(b.date);
                case 'amount-desc':
                    return b.totalAmount - a.totalAmount;
                case 'amount-asc':
                    return a.totalAmount - b.totalAmount;
                default:
                    return 0;
            }
        });

        return result;
    }, [purchases, searchTerm, statusFilter, sortBy]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'shipped':
                return 'bg-blue-100 text-blue-800';
            case 'processing':
                return 'bg-yellow-100 text-yellow-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'delivered':
                return <CheckCircle className="w-4 h-4" />;
            case 'shipped':
                return <Truck className="w-4 h-4" />;
            case 'processing':
                return <Package className="w-4 h-4" />;
            case 'cancelled':
                return <XCircle className="w-4 h-4" />;
            default:
                return <Package className="w-4 h-4" />;
        }
    };

    const handleRate = (purchaseId, rating) => {
        alert(`Rated order ${purchaseId} with ${rating} stars`);
    };

    const handleDownloadInvoice = (orderNumber) => {
        alert(`Downloading invoice for ${orderNumber}`);
    };

    const handleContactSeller = (seller) => {
        alert(`Opening chat with ${seller}`);
    };

    const handleTrackOrder = (trackingNumber) => {
        if (trackingNumber) {
            alert(`Opening tracking for ${trackingNumber}`);
        } else {
            alert('Tracking information not yet available');
        }
    };

    const PurchaseCard = ({ purchase }) => (
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-semibold text-gray-900">{purchase.orderNumber}</h3>
                    <p className="text-sm text-gray-500">{new Date(purchase.date).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">Sold by: {purchase.seller}</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(purchase.status)}`}>
                        {getStatusIcon(purchase.status)}
                        {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                    </span>
                </div>
            </div>

            {/* Items */}
            <div className="space-y-3 mb-4">
                {purchase.items.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-md object-cover"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/48x48/cccccc/666666?text=No+Image';
                            }}
                        />
                        <div className="flex-1">
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity} × ${item.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-gray-900">Total: ${purchase.totalAmount}</span>
                    {purchase.status === 'delivered' && !purchase.reviewed && (
                        <div className="flex items-center gap-1">
                            <span className="text-sm text-gray-600">Rate:</span>
                            {[1, 2, 3, 4, 5].map(star => (
                                <button
                                    key={star}
                                    onClick={() => handleRate(purchase.id, star)}
                                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                                >
                                    <Star className="w-4 h-4" />
                                </button>
                            ))}
                        </div>
                    )}
                    {purchase.reviewed && (
                        <div className="flex items-center gap-1">
                            <span className="text-sm text-gray-600">Your rating:</span>
                            {[1, 2, 3, 4, 5].map(star => (
                                <Star
                                    key={star}
                                    className={`w-4 h-4 ${star <= purchase.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedPurchase(purchase)}
                        className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                    >
                        View Details
                    </button>
                    
                    {purchase.status === 'shipped' && (
                        <button
                            onClick={() => handleTrackOrder(purchase.trackingNumber)}
                            className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                        >
                            Track Order
                        </button>
                    )}

                    <button
                        onClick={() => handleDownloadInvoice(purchase.orderNumber)}
                        className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors flex items-center gap-1"
                    >
                        <Download className="w-3 h-3" />
                        Invoice
                    </button>

                    <button
                        onClick={() => handleContactSeller(purchase.seller)}
                        className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors flex items-center gap-1"
                    >
                        <MessageSquare className="w-3 h-3" />
                        Contact Seller
                    </button>
                </div>
            </div>
        </div>
    );

    const PurchaseDetailsModal = ({ purchase, onClose }) => {
        if (!purchase) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center p-6 border-b">
                        <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        <div>
                            <h3 className="font-medium text-gray-900 mb-2">Order Information</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-600">Order Number:</span>
                                    <p className="font-medium">{purchase.orderNumber}</p>
                                </div>
                                <div>
                                    <span className="text-gray-600">Date:</span>
                                    <p className="font-medium">{new Date(purchase.date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <span className="text-gray-600">Status:</span>
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(purchase.status)}`}>
                                        {getStatusIcon(purchase.status)}
                                        {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Seller:</span>
                                    <p className="font-medium">{purchase.seller}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium text-gray-900 mb-2">Items</h3>
                            <div className="space-y-3">
                                {purchase.items.map(item => (
                                    <div key={item.id} className="flex items-center gap-4 p-3 border rounded-lg">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 rounded-md object-cover"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-medium">{item.name}</h4>
                                            <p className="text-sm text-gray-600">
                                                Quantity: {item.quantity} × ${item.price} = ${(item.quantity * item.price).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium text-gray-900 mb-2">Shipping Information</h3>
                            <div className="text-sm">
                                <p className="text-gray-600">Shipping Address:</p>
                                <p className="font-medium">{purchase.shippingAddress}</p>
                                {purchase.trackingNumber && (
                                    <>
                                        <p className="text-gray-600 mt-2">Tracking Number:</p>
                                        <p className="font-medium">{purchase.trackingNumber}</p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold">Total: ${purchase.totalAmount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">My Purchases</h1>
                <p className="text-gray-600">Track your orders and manage your purchase history</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search orders, sellers, or items..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="date-desc">Newest First</option>
                        <option value="date-asc">Oldest First</option>
                        <option value="amount-desc">Highest Amount</option>
                        <option value="amount-asc">Lowest Amount</option>
                    </select>
                </div>
            </div>

            {/* Purchase List */}
            {filteredAndSortedPurchases.length > 0 ? (
                <div className="space-y-4">
                    {filteredAndSortedPurchases.map(purchase => (
                        <PurchaseCard key={purchase.id} purchase={purchase} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No purchases found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
            )}

            {/* Purchase Details Modal */}
            <PurchaseDetailsModal
                purchase={selectedPurchase}
                onClose={() => setSelectedPurchase(null)}
            />
        </div>
    );
};

export default MyPurchases;

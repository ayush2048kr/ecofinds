import React, { useState, useEffect } from 'react';

// Mock data for purchases (replacing data.js)
const mockPurchases = [
    {
        id: 1,
        name: "Vintage Camera",
        price: 299.99,
        status: "Delivered",
        seller: "PhotoGear Pro",
        img: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=80&h=80&fit=crop&crop=center"
    },
    {
        id: 2,
        name: "Designer Handbag",
        price: 150.00,
        status: "Shipped",
        seller: "Fashion Central",
        img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=80&h=80&fit=crop&crop=center"
    },
    {
        id: 3,
        name: "Gaming Headset",
        price: 89.95,
        status: "Processing",
        seller: "TechWorld",
        img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=80&h=80&fit=crop&crop=center"
    },
    {
        id: 4,
        name: "Leather Wallet",
        price: 45.00,
        status: "Delivered",
        seller: "Craft & Co",
        img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80&h=80&fit=crop&crop=center"
    }
];

// Top Bar Component
const TopBar = () => {
    const handleProfileClick = () => {
        // In a real app, you'd use React Router
        alert('Navigate to profile page');
    };

    const handleCartClick = () => {
        alert('TODO: link cart');
    };

    return (
        <header className="flex justify-between items-center mb-4">
            <div className="logo">
                <img
                    src="https://via.placeholder.com/70x70/203a43/ffffff?text=LOGO"
                    alt="Logo"
                    className="h-16 w-auto"
                />
            </div>
            <div className="flex items-center gap-3">
                <button
                    className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-xl border-none cursor-pointer hover:bg-gray-400 transition-colors"
                    onClick={handleProfileClick}
                >
                    👤
                </button>
                <button
                    className="bg-none border-none cursor-pointer text-xl hover:opacity-70 transition-opacity"
                    onClick={handleCartClick}
                >
                    🛒
                </button>
            </div>
        </header>
    );
};

// Page Title Component
const PageTitle = ({ title }) => {
    return (
        <h3 className="text-xl font-bold text-center mb-5 mt-0">
            {title}
        </h3>
    );
};

// Individual Purchase Item Component
const PurchaseItem = ({ purchase }) => {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered':
                return 'text-green-600';
            case 'shipped':
                return 'text-blue-600';
            case 'processing':
                return 'text-yellow-600';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <div className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img
                src={purchase.img}
                alt={purchase.name}
                className="w-20 h-20 rounded-lg mr-4 object-cover"
                onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/80x80/cccccc/666666?text=No+Image';
                }}
            />
            <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1 text-gray-800">
                    {purchase.name}
                </h3>
                <p className="text-gray-600 mb-1">
                    <span className="font-medium">Price:</span> ${purchase.price}
                </p>
                <p className={`mb-1 font-medium ${getStatusColor(purchase.status)}`}>
                    <span className="text-gray-600 font-normal">Status:</span> {purchase.status}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">Seller:</span> {purchase.seller}
                </p>
            </div>
        </div>
    );
};

// Purchase List Component
const PurchaseList = ({ purchases }) => {
    if (!purchases || purchases.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500 text-lg">No purchases found</p>
                <p className="text-gray-400">Your purchase history will appear here</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {purchases.map((purchase) => (
                <PurchaseItem key={purchase.id} purchase={purchase} />
            ))}
        </div>
    );
};

// Search/Filter Component (bonus feature)
const SearchFilter = ({ onSearch, onFilterStatus }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const handleStatusChange = (e) => {
        const value = e.target.value;
        setStatusFilter(value);
        onFilterStatus(value);
    };

    return (
        <div className="flex gap-4 mb-6 flex-wrap">
            <input
                type="text"
                placeholder="Search purchases..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="flex-1 min-w-60 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
                value={statusFilter}
                onChange={handleStatusChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
                <option value="all">All Status</option>
                <option value="delivered">Delivered</option>
                <option value="shipped">Shipped</option>
                <option value="processing">Processing</option>
            </select>
        </div>
    );
};

// Main Purchases Page Component
const Purchase = () => {
    const [purchases, setPurchases] = useState([]);
    const [filteredPurchases, setFilteredPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    // Simulate loading data
    useEffect(() => {
        // Simulate API call delay
        const timer = setTimeout(() => {
            setPurchases(mockPurchases);
            setFilteredPurchases(mockPurchases);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleSearch = (searchTerm) => {
        const filtered = purchases.filter(purchase =>
            purchase.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            purchase.seller.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPurchases(filtered);
    };

    const handleFilterStatus = (status) => {
        if (status === 'all') {
            setFilteredPurchases(purchases);
        } else {
            const filtered = purchases.filter(purchase =>
                purchase.status.toLowerCase() === status.toLowerCase()
            );
            setFilteredPurchases(filtered);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 font-sans p-5">
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-gray-600">Loading purchases...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans p-5">
            <TopBar />
            <PageTitle title="My Purchases" />
            <SearchFilter onSearch={handleSearch} onFilterStatus={handleFilterStatus} />
            <PurchaseList purchases={filteredPurchases} />
        </div>
    );
};

export default Purchase;
import React, { useState, useEffect, useMemo } from 'react';
import { X, Plus, Edit, Trash2, Save, Upload } from 'lucide-react';

// Mock data for listings (replacing data.js)
const mockListings = [
    {
        id: 1,
        name: "Vintage Leather Jacket",
        price: 125.00,
        category: "Fashion",
        status: "Active",
        seller: "StyleVintage",
        img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=80&h=80&fit=crop&crop=center"
    },
    {
        id: 2,
        name: "MacBook Pro 2019",
        price: 899.99,
        category: "Electronics",
        status: "Sold",
        seller: "TechDeals Pro",
        img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=80&h=80&fit=crop&crop=center"
    },
    {
        id: 3,
        name: "Antique Coffee Table",
        price: 250.00,
        category: "Furniture",
        status: "Active",
        seller: "Antique Corner",
        img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=80&h=80&fit=crop&crop=center"
    },
    {
        id: 4,
        name: "Canon DSLR Camera",
        price: 450.00,
        category: "Electronics",
        status: "Pending",
        seller: "PhotoGear Hub",
        img: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=80&h=80&fit=crop&crop=center"
    },
    {
        id: 5,
        name: "Designer Handbag",
        price: 89.99,
        category: "Fashion",
        status: "Active",
        seller: "Fashion Forward",
        img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=80&h=80&fit=crop&crop=center"
    },
    {
        id: 6,
        name: "Wooden Dining Set",
        price: 380.00,
        category: "Furniture",
        status: "Active",
        seller: "Home Essentials",
        img: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=80&h=80&fit=crop&crop=center"
    }
];

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

// Confirmation Dialog Component
const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
                    <p className="text-gray-600 mb-6">{message}</p>
                    <div className="flex gap-3 justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Product Form Component
const ProductForm = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        price: product?.price || '',
        category: product?.category || '',
        status: product?.status || 'Active',
        seller: product?.seller || '',
        img: product?.img || ''
    });

    const [selectedImage, setSelectedImage] = useState(product?.img || null);
    const [errors, setErrors] = useState({});

    const categories = ['Electronics', 'Fashion', 'Furniture', 'Sports', 'Books', 'Other'];
    const statuses = ['Active', 'Pending', 'Sold'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
                setFormData(prev => ({
                    ...prev,
                    img: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) newErrors.name = 'Product name is required';
        if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.seller.trim()) newErrors.seller = 'Seller name is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSave({
                ...formData,
                price: parseFloat(formData.price),
                img: selectedImage || formData.img || 'https://via.placeholder.com/80x80/cccccc/666666?text=No+Image'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image Upload */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                <div className="flex items-center gap-4">
                    {selectedImage && (
                        <img
                            src={selectedImage}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg"
                        />
                    )}
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                        />
                        <label
                            htmlFor="image-upload"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                        >
                            <Upload size={16} className="mr-2" />
                            Choose Image
                        </label>
                    </div>
                </div>
            </div>

            {/* Product Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter product name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Price */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            {/* Category and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.category ? 'border-red-500' : 'border-gray-300'
                        }`}
                    >
                        <option value="">Select category</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {statuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Seller */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seller</label>
                <input
                    type="text"
                    name="seller"
                    value={formData.seller}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.seller ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter seller name"
                />
                {errors.seller && <p className="text-red-500 text-sm mt-1">{errors.seller}</p>}
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
                <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                    <Save size={16} />
                    {product ? 'Update Product' : 'Add Product'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

// Top Bar Component
const TopBar = () => {
    const handleProfileClick = () => {
        alert('Navigate to user profile');
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
        <h2 className="text-2xl font-bold text-center mb-4 mt-0">
            {title}
        </h2>
    );
};

// Search Bar Component
const SearchBar = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="mb-4">
            <input
                type="text"
                id="searchBox"
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>
    );
};

// Filter Controls Component
const FilterControls = ({
    sortOption,
    onSortChange,
    categoryFilter,
    onCategoryFilterChange,
    groupByCategory,
    onGroupByCategoryChange,
    categories
}) => {
    return (
        <div className="flex flex-wrap gap-2 mb-4">
            <select
                value={sortOption}
                onChange={(e) => onSortChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
                <option value="default">Default Order</option>
                <option value="alphabetical">Sort A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
            </select>

            <select
                value={categoryFilter}
                onChange={(e) => onCategoryFilterChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
                <option value="all">All Categories</option>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>

            <button
                onClick={() => onGroupByCategoryChange(!groupByCategory)}
                className={`px-4 py-2 rounded-lg transition-colors ${groupByCategory
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
            >
                {groupByCategory ? 'Ungroup' : 'Group by Category'}
            </button>
        </div>
    );
};

// Individual Listing Item Component
const ListingItem = ({ listing, onEdit, onDelete }) => {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'text-green-600';
            case 'sold':
                return 'text-gray-600';
            case 'pending':
                return 'text-yellow-600';
            default:
                return 'text-gray-600';
        }
    };

    const getStatusBadge = (status) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'sold':
                return 'bg-gray-100 text-gray-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img
                src={listing.img}
                alt={listing.name}
                className="w-20 h-20 rounded-lg mr-4 object-cover"
                onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/80x80/cccccc/666666?text=No+Image';
                }}
            />
            <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                        {listing.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(listing.status)}`}>
                        {listing.status}
                    </span>
                </div>
                <p className="text-gray-600 mb-1">
                    <span className="font-medium">Price:</span> ${listing.price}
                </p>
                <p className="text-gray-600 mb-1">
                    <span className="font-medium">Category:</span> {listing.category}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">Seller:</span> {listing.seller}
                </p>
            </div>
            <div className="ml-4 flex flex-col gap-2">
                <button 
                    onClick={() => onEdit(listing)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center gap-1"
                >
                    <Edit size={14} />
                    Edit
                </button>
                <button 
                    onClick={() => onDelete(listing)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center gap-1"
                >
                    <Trash2 size={14} />
                    Delete
                </button>
            </div>
        </div>
    );
};

// Category Group Component
const CategoryGroup = ({ category, listings, onEdit, onDelete }) => {
    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">
                {category} ({listings.length})
            </h3>
            <div className="flex flex-col gap-4">
                {listings.map(listing => (
                    <ListingItem 
                        key={listing.id} 
                        listing={listing}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

// Listings List Component
const ListingsList = ({ listings, groupByCategory, onEdit, onDelete }) => {
    if (!listings || listings.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500 text-lg">No listings found</p>
                <p className="text-gray-400">Your listings will appear here</p>
            </div>
        );
    }

    if (groupByCategory) {
        const groupedListings = listings.reduce((groups, listing) => {
            const category = listing.category;
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(listing);
            return groups;
        }, {});

        return (
            <div>
                {Object.entries(groupedListings)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([category, categoryListings]) => (
                        <CategoryGroup
                            key={category}
                            category={category}
                            listings={categoryListings}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))
                }
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {listings.map(listing => (
                <ListingItem 
                    key={listing.id} 
                    listing={listing}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

// Main Listings Page Component
const ProductListing = () => {
    const [listings, setListings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('default');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [groupByCategory, setGroupByCategory] = useState(false);
    const [loading, setLoading] = useState(true);
    
    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [nextId, setNextId] = useState(7); // Start from 7 since we have 6 mock items

    // Get unique categories
    const categories = useMemo(() => {
        return [...new Set(listings.map(listing => listing.category))].sort();
    }, [listings]);

    // Simulate loading data
    useEffect(() => {
        const timer = setTimeout(() => {
            setListings(mockListings);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Filter and sort listings
    const filteredAndSortedListings = useMemo(() => {
        let result = [...listings];

        // Filter by search term
        if (searchTerm) {
            result = result.filter(listing =>
                listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                listing.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                listing.seller.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (categoryFilter !== 'all') {
            result = result.filter(listing => listing.category === categoryFilter);
        }

        // Sort listings
        switch (sortOption) {
            case 'alphabetical':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            default:
                // Keep original order
                break;
        }

        return result;
    }, [listings, searchTerm, sortOption, categoryFilter]);

    // CRUD Handlers
    const handleAddProduct = (productData) => {
        const newProduct = {
            id: nextId,
            ...productData
        };
        setListings(prev => [...prev, newProduct]);
        setNextId(prev => prev + 1);
        setIsAddModalOpen(false);
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const handleUpdateProduct = (updatedData) => {
        setListings(prev => prev.map(listing => 
            listing.id === selectedProduct.id 
                ? { ...listing, ...updatedData }
                : listing
        ));
        setIsEditModalOpen(false);
        setSelectedProduct(null);
    };

    const handleDeleteProduct = (product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        setListings(prev => prev.filter(listing => listing.id !== selectedProduct.id));
        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
    };

    const closeModals = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 font-sans p-5">
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-gray-600">Loading listings...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans p-5">
            <TopBar />
            <PageTitle title="My Listings" />
            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />
            <FilterControls
                sortOption={sortOption}
                onSortChange={setSortOption}
                categoryFilter={categoryFilter}
                onCategoryFilterChange={setCategoryFilter}
                groupByCategory={groupByCategory}
                onGroupByCategoryChange={setGroupByCategory}
                categories={categories}
            />
            
            {/* Add Product Button */}
            <div className="mb-6">
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 shadow-md"
                >
                    <Plus size={20} />
                    Add New Product
                </button>
            </div>
            
            <ListingsList
                listings={filteredAndSortedListings}
                groupByCategory={groupByCategory}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
            />
            
            {/* Modals */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={closeModals}
                title="Add New Product"
            >
                <ProductForm
                    onSave={handleAddProduct}
                    onCancel={closeModals}
                />
            </Modal>
            
            <Modal
                isOpen={isEditModalOpen}
                onClose={closeModals}
                title="Edit Product"
            >
                <ProductForm
                    product={selectedProduct}
                    onSave={handleUpdateProduct}
                    onCancel={closeModals}
                />
            </Modal>
            
            <ConfirmDialog
                isOpen={isDeleteModalOpen}
                onClose={closeModals}
                onConfirm={confirmDelete}
                title="Delete Product"
                message={`Are you sure you want to delete "${selectedProduct?.name}"? This action cannot be undone.`}
            />
        </div>
    );
};

export default ProductListing;
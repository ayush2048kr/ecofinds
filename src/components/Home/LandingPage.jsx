import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Star, ArrowRight, Check, Zap, Shield, Truck, Heart, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Auth from '../Auth/Auth';

const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const navigate = useNavigate();

    const heroSlides = [
        {
            title: "Discover Amazing Products",
            subtitle: "Shop the latest trends with unbeatable prices",
            bg: "from-purple-600 via-pink-600 to-blue-600"
        },
        {
            title: "Premium Quality Guaranteed",
            subtitle: "Every product curated for excellence",
            bg: "from-blue-600 via-indigo-600 to-purple-600"
        },
        {
            title: "Fast & Free Delivery",
            subtitle: "Get your orders delivered in record time",
            bg: "from-emerald-600 via-teal-600 to-cyan-600"
        }
    ];

    const featuredProducts = [
        { id: 1, name: "Wireless Headphones", price: 99.99, rating: 4.8, image: "🎧", category: "Electronics" },
        { id: 2, name: "Smart Watch", price: 299.99, rating: 4.9, image: "⌚", category: "Wearables" },
        { id: 3, name: "Laptop Stand", price: 49.99, rating: 4.7, image: "💻", category: "Accessories" },
        { id: 4, name: "Coffee Maker", price: 129.99, rating: 4.6, image: "☕", category: "Home" },
        { id: 5, name: "Running Shoes", price: 89.99, rating: 4.8, image: "👟", category: "Sports" },
        { id: 6, name: "Backpack", price: 59.99, rating: 4.5, image: "🎒", category: "Travel" }
    ];

    const categories = [
        { name: "Electronics", icon: "📱", count: "2.5k+" },
        { name: "Fashion", icon: "👕", count: "1.8k+" },
        { name: "Home & Garden", icon: "🏠", count: "3.2k+" },
        { name: "Sports", icon: "⚽", count: "1.1k+" },
        { name: "Books", icon: "📚", count: "950+" },
        { name: "Beauty", icon: "💄", count: "720+" },
        { name: "Toys", icon: "🧸", count: "650+" },
        { name: "Automotive", icon: "🚗", count: "480+" }
    ];

    const features = [
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Lightning Fast",
            description: "Quick browsing and instant search results"
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Secure Payment",
            description: "Your transactions are 100% secure"
        },
        {
            icon: <Truck className="w-6 h-6" />,
            title: "Free Shipping",
            description: "Free delivery on orders over $50"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="relative bg-white shadow-lg border-b z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                S
                            </div>
                            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                ShopHub
                            </span>
                        </div>

                        {/* Search bar - hidden on mobile */}
                        <div className="hidden md:flex flex-1 max-w-lg mx-8">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="Search for products..."
                                    className="w-full h-12 pl-4 pr-12 border-2 border-gray-200 rounded-full focus:border-purple-500 focus:outline-none transition-colors"
                                />
                                <Search className="absolute right-4 top-3 w-6 h-6 text-gray-400" />
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-6">
                            <button 
                                className="relative hover:text-purple-600 transition-colors"
                                onClick={() => navigate('/card-page')}
                                title="View Shopping Cart"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    3
                                </span>
                            </button>
                            <button 
                                className="hover:text-purple-600 transition-colors"
                                onClick={() => navigate('/user-dashboard')}
                                title="User Profile"
                            >
                                <User className="w-6 h-6" />
                            </button>
                            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all" onClick={() => navigate('/auth')}>
                                Sign In
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {
                    isMenuOpen && (
                        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t shadow-lg">
                            <div className="px-4 py-4 space-y-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        className="w-full h-10 pl-4 pr-10 border border-gray-300 rounded-lg"
                                    />
                                    <Search className="absolute right-3 top-2 w-6 h-6 text-gray-400" />
                                </div>
                                <button 
                                    className="flex items-center justify-between w-full py-2"
                                    onClick={() => {
                                        navigate('/card-page');
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    <span>Cart</span>
                                    <ShoppingCart className="w-5 h-5" />
                                </button>
                                <button 
                                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg"
                                    onClick={() => {
                                        navigate('/auth');
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    Sign In
                                </button>
                            </div>
                        </div>
                    )
                }
            </header >

            {/* Hero Section */}
            < section className="relative overflow-hidden" >
                <div className={`h-96 bg-gradient-to-r ${heroSlides[currentSlide].bg} flex items-center justify-center transition-all duration-1000`}>
                    <div className="text-center text-white px-4 max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-pulse">
                            {heroSlides[currentSlide].title}
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 opacity-90">
                            {heroSlides[currentSlide].subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button 
                                className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                                onClick={() => navigate('/product-listing')}
                            >
                                Shop Now
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button 
                                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all"
                                onClick={() => alert('Learn more about our amazing products and services!')}
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>

                {/* Slide indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white' : 'bg-white/50'
                                }`}
                        />
                    ))}
                </div>
            </section >

            {/* Features Section */}
            < section className="py-16 bg-gray-50" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="text-center group">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white mb-4 group-hover:shadow-lg transition-all transform group-hover:scale-110">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* Featured Products */}
            < section className="py-16" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
                        <p className="text-gray-600 text-lg">Discover our most popular items</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-xl shadow-lg border hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                                onMouseEnter={() => setHoveredProduct(product.id)}
                                onMouseLeave={() => setHoveredProduct(null)}
                            >
                                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl flex items-center justify-center text-6xl">
                                    {product.image}
                                    <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                                    </button>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                                            {product.category}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-sm font-medium">{product.rating}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-2xl font-bold text-purple-600 mb-4">
                                        ${product.price}
                                    </p>
                                    <button 
                                        className={`w-full py-3 rounded-lg font-semibold transition-all ${hoveredProduct === product.id
                                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                        onClick={() => {
                                            if (hoveredProduct === product.id) {
                                                alert(`Added ${product.name} to cart!`);
                                            } else {
                                                alert(`Viewing details for ${product.name}`);
                                            }
                                        }}
                                    >
                                        {hoveredProduct === product.id ? 'Add to Cart' : 'View Details'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* Categories Section */}
            < section className="py-16 bg-gray-50" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
                        <p className="text-gray-600 text-lg">Find exactly what you're looking for</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                                onClick={() => alert(`Browsing ${category.name} category with ${category.count} items`)}
                            >
                                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                                    {category.icon}
                                </div>
                                <h3 className="font-semibold mb-1 group-hover:text-purple-600 transition-colors">
                                    {category.name}
                                </h3>
                                <p className="text-sm text-gray-500">{category.count} items</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* Newsletter Section */}
            < section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white" >
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in the Loop</h2>
                    <p className="text-xl mb-8 opacity-90">
                        Get the latest deals and updates delivered to your inbox
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30"
                            id="newsletter-email"
                        />
                        <button 
                            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                            onClick={() => {
                                const email = document.getElementById('newsletter-email').value;
                                if (email) {
                                    alert(`Thank you for subscribing with ${email}!`);
                                    document.getElementById('newsletter-email').value = '';
                                } else {
                                    alert('Please enter a valid email address.');
                                }
                            }}
                        >
                            Subscribe
                        </button>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-4 text-sm opacity-80">
                        <Check className="w-4 h-4" />
                        <span>No spam, unsubscribe anytime</span>
                    </div>
                </div>
            </section >

            {/* Footer */}
            < footer className="bg-gray-900 text-white py-12" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                                    S
                                </div>
                                <span className="ml-2 text-xl font-bold">ShopHub</span>
                            </div>
                            <p className="text-gray-400">
                                Your one-stop destination for amazing products at unbeatable prices.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Customer Service</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Legal</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 ShopHub. All rights reserved.</p>
                    </div>
                </div>
            </footer >
        </div >
    );
};

export default LandingPage;
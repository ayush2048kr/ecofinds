import React, { useState } from 'react';
import { User, Package, ShoppingCart, Settings as SettingsIcon, LogOut, List, Home } from 'lucide-react';
import Profile from './Profile';
import MyPurchases from './MyPurchases';
import Settings from './Settings';
import ProductListing from '../ProductListing/ProductListing';

// Top Bar Component
const TopBar = ({ onMenuToggle }) => {
    return (
        <header className="flex justify-between items-center px-4 sm:px-6 py-4 bg-white shadow-md sticky top-0 z-50">
            <div className="flex items-center gap-4">
                {/* Mobile menu button */}
                <button 
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                    onClick={onMenuToggle}
                >
                    <div className="w-6 h-6 flex flex-col justify-center items-center">
                        <span className="w-full h-0.5 bg-gray-600 mb-1"></span>
                        <span className="w-full h-0.5 bg-gray-600 mb-1"></span>
                        <span className="w-full h-0.5 bg-gray-600"></span>
                    </div>
                </button>
                <div className="logo">
                    <img
                        src="https://via.placeholder.com/70x70/203a43/ffffff?text=LOGO"
                        alt="Logo"
                        className="h-12 sm:h-16 w-auto"
                    />
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button 
                    className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-xl border-none cursor-pointer hover:bg-gray-400 transition-colors"
                    onClick={() => alert('User profile clicked')}
                >
                    👤
                </button>
                <button
                    className="bg-none border-none cursor-pointer text-xl hover:scale-110 transition-transform"
                    onClick={() => alert('Navigate to cart')}
                >
                    🛒
                </button>
            </div>
        </header>
    );
};

// Sidebar Component
const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen, currentPage, setCurrentPage }) => {
    const navItems = [
        { text: 'Profile', key: 'profile', icon: <User className="w-4 h-4" /> },
        { text: 'My Listings', key: 'listings', icon: <List className="w-4 h-4" /> },
        { text: 'My Purchases', key: 'purchases', icon: <ShoppingCart className="w-4 h-4" /> },
        { text: 'Settings', key: 'settings', icon: <SettingsIcon className="w-4 h-4" /> },
        { text: 'Logout', key: 'logout', icon: <LogOut className="w-4 h-4" /> }
    ];

    const handleNavClick = (item) => {
        if (item.key === 'logout') {
            if (window.confirm('Are you sure you want to logout?')) {
                // Handle logout logic here
                window.location.href = '/';
            }
            return;
        }
        
        setCurrentPage(item.key);
        if (setIsMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-56 bg-slate-800 text-white flex flex-col p-5 fixed top-24 bottom-0 z-40">
                <h2 className="m-0 mb-8 text-xl text-center font-semibold">Dashboard</h2>
                {navItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => handleNavClick(item)}
                        className={`text-white text-left no-underline py-3 px-4 rounded-md mb-5 flex items-center gap-3 transition-colors duration-300 hover:bg-slate-700 w-full ${
                            currentPage === item.key ? 'bg-slate-700' : ''
                        }`}
                    >
                        {item.icon}
                        {item.text}
                    </button>
                ))}
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <div className="relative bg-slate-800 text-white flex flex-col p-5 w-64 h-full">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-semibold">Dashboard</h2>
                            <button 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-white hover:text-gray-300 p-2"
                            >
                                ✕
                            </button>
                        </div>
                        {navItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => handleNavClick(item)}
                                className={`text-white text-left no-underline py-3 px-4 rounded-md mb-5 flex items-center gap-3 transition-colors duration-300 hover:bg-slate-700 w-full ${
                                    currentPage === item.key ? 'bg-slate-700' : ''
                                }`}
                            >
                                {item.icon}
                                {item.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};


// Page Content Renderer
const renderPageContent = (currentPage) => {
    switch (currentPage) {
        case 'profile':
            return <Profile />;
        case 'listings':
            return <ProductListing />;
        case 'purchases':
            return <MyPurchases />;
        case 'settings':
            return <Settings />;
        default:
            return <Profile />;
    }
};

// Main App Component
const UserDashBoard = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('profile');

    const handleMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <TopBar onMenuToggle={handleMenuToggle} />
            <Sidebar 
                isMobileMenuOpen={isMobileMenuOpen} 
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <main className="lg:ml-56 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                {renderPageContent(currentPage)}
            </main>
        </div>
    );
};

export default UserDashBoard;
import React, { useState } from 'react';
import { ArrowLeft, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';

const CardPage = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Premium Wireless Headphones",
            color: "Black",
            size: "One Size",
            price: 2999.00,
            quantity: 1,
            image: "🎧"
        },
        {
            id: 2,
            name: "Cotton T-Shirt",
            color: "Blue",
            size: "Medium",
            price: 799.00,
            quantity: 2,
            image: "👕"
        },
        {
            id: 3,
            name: "Smartphone Case",
            color: "Clear",
            size: "iPhone 14",
            price: 1299.00,
            quantity: 1,
            image: "📱"
        }
    ]);

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(items =>
            items.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleCheckout = () => {
        alert('Proceeding to checkout...');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto bg-white shadow-lg min-h-screen">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b bg-white sticky top-0 z-10">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <h1 className="text-2xl font-semibold text-gray-800">Shopping Cart</h1>
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-gray-600" />
                    </div>
                </div>

                {cartItems.length === 0 ? (
                    <div className="flex items-center justify-center h-96">
                        <div className="text-center">
                            <div className="text-8xl mb-6">🛒</div>
                            <h3 className="text-3xl font-semibold text-gray-800 mb-4">Your cart is empty</h3>
                            <p className="text-xl text-gray-600 mb-8">Add some items to get started!</p>
                            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg">
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-8 p-6">
                        {/* Left Column - Cart Items */}
                        <div className="flex-1 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Cart Items ({getTotalItems()})
                                </h2>
                            </div>

                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center space-x-6">
                                        {/* Product Image */}
                                        <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                                            {item.image}
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                {item.name}
                                            </h3>
                                            <div className="text-gray-500 mb-3">
                                                <span className="text-base">{item.color} • {item.size}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-2xl font-bold text-blue-600">
                                                    ₹{item.price.toFixed(2)}
                                                </span>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors"
                                                        >
                                                            <Minus className="w-5 h-5 text-gray-600" />
                                                        </button>
                                                        <span className="px-4 py-2 text-lg font-medium min-w-[60px] text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
                                                        >
                                                            <Plus className="w-5 h-5 text-gray-600" />
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
                                                    >
                                                        <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Item Total */}
                                            {item.quantity > 1 && (
                                                <div className="mt-3 text-gray-600">
                                                    <span className="text-base">Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Promo Code */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Have a promo code?</h3>
                                <div className="flex space-x-3">
                                    <input
                                        type="text"
                                        placeholder="Enter promo code"
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                                    />
                                    <button className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium">
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="w-96 space-y-6">
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sticky top-24">
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-base">
                                        <span className="text-gray-600">Items ({getTotalItems()})</span>
                                        <span className="text-gray-900 font-medium">₹{getTotalPrice().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-base">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="text-green-600 font-medium">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-base">
                                        <span className="text-gray-600">Tax (10%)</span>
                                        <span className="text-gray-900 font-medium">₹{(getTotalPrice() * 0.1).toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-gray-300 pt-4 mt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xl font-semibold text-gray-900">Total</span>
                                            <span className="text-2xl font-bold text-blue-600">
                                                ₹{(getTotalPrice() + (getTotalPrice() * 0.1)).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-8"
                                >
                                    Checkout ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})
                                </button>

                                {/* Additional Info */}
                                <div className="mt-6 text-center">
                                    <div className="text-sm text-gray-500 space-y-1">
                                        <p>✓ Secure checkout</p>
                                        <p>✓ Easy returns within 30 days</p>
                                        <p>✓ Free shipping on orders over ₹999</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardPage;
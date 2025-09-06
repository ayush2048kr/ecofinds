import React, { useState } from 'react';

// Top Bar Component
const TopBar = () => {
    return (
        <header className="flex justify-between items-center px-5 py-4 bg-white shadow-md sticky top-0 z-50">
            <div className="logo">
                <img
                    src="https://via.placeholder.com/70x70/203a43/ffffff?text=LOGO"
                    alt="Logo"
                    className="h-16 w-auto"
                />
            </div>
            <div className="flex items-center gap-3">
                <button className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-xl border-none cursor-pointer">
                    👤
                </button>
                <button
                    className="bg-none border-none cursor-pointer text-xl"
                    onClick={() => alert('TODO: link cart')}
                >
                    🛒
                </button>
            </div>
        </header>
    );
};

// Sidebar Component
const Sidebar = () => {
    const navItems = [
        { text: 'Profile', href: 'user.html' },
        { text: 'My Listings', href: 'listings.html' },
        { text: 'My Purchases', href: 'purchase.html' },
        { text: 'Settings', href: '#' },
        { text: 'Logout', href: '#' }
    ];

    return (
        <div className="w-56 bg-slate-800 text-white flex flex-col p-5 fixed top-24 bottom-0">
            <h2 className="m-0 mb-8 text-xl text-center font-semibold">Dashboard</h2>
            {navItems.map((item, index) => (
                <a
                    key={index}
                    href={item.href}
                    className="text-white no-underline py-3 px-4 rounded-md mb-5 block transition-colors duration-300 hover:bg-slate-700"
                >
                    {item.text}
                </a>
            ))}
        </div>
    );
};

// Profile Picture Component
const ProfilePicture = ({ profileImage, onImageChange }) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                onImageChange(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="relative w-36 h-36 mx-auto mb-5">
            <div
                className="w-36 h-36 rounded-full border-2 border-gray-300 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${profileImage || 'https://via.placeholder.com/140'})`
                }}
            />
            <label
                htmlFor="fileInput"
                className="absolute bottom-2 right-2 bg-slate-800 text-white border-2 border-white rounded-full w-8 h-8 flex justify-center items-center cursor-pointer text-sm hover:bg-slate-700 transition-colors"
            >
                ✏️
            </label>
            <input
                type="file"
                id="fileInput"
                accept="image/*"
                hidden
                onChange={handleFileChange}
            />
        </div>
    );
};

// Form Input Component
const FormInput = ({ type, placeholder, value, onChange }) => {
    return (
        <input
            className="w-full h-11 border border-gray-300 rounded-md my-2 px-3 text-base outline-none transition-colors focus:border-slate-800"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};

// Navigation Buttons Component
const NavButtons = ({ onSave, onCancel }) => {
    return (
        <div className="flex gap-4 mt-6">
            <button
                className="py-3 px-5 bg-slate-800 text-white rounded-md cursor-pointer transition-colors hover:bg-slate-700"
                onClick={onSave}
            >
                Save
            </button>
            <button
                className="py-3 px-5 bg-slate-800 text-white rounded-md cursor-pointer transition-colors hover:bg-slate-700"
                onClick={onCancel}
            >
                Cancel
            </button>
        </div>
    );
};

// Profile Section Component
const ProfileSection = () => {
    const [profileImage, setProfileImage] = useState('');
    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        otherInfo: ''
    });

    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleSave = () => {
        console.log('Saving profile data:', { formData, profileImage });
        alert('Profile saved successfully!');
    };

    const handleCancel = () => {
        setFormData({
            userName: '',
            userEmail: '',
            otherInfo: ''
        });
        setProfileImage('');
        alert('Changes cancelled');
    };

    return (
        <div className="bg-white rounded-xl p-8 max-w-3xl mx-auto shadow-lg">
            <ProfilePicture
                profileImage={profileImage}
                onImageChange={setProfileImage}
            />

            <FormInput
                type="text"
                placeholder="User Name"
                value={formData.userName}
                onChange={handleInputChange('userName')}
            />

            <FormInput
                type="email"
                placeholder="User Email"
                value={formData.userEmail}
                onChange={handleInputChange('userEmail')}
            />

            <FormInput
                type="text"
                placeholder="Other Info"
                value={formData.otherInfo}
                onChange={handleInputChange('otherInfo')}
            />

            <NavButtons onSave={handleSave} onCancel={handleCancel} />
        </div>
    );
};

// Main App Component
const UserDashBoard = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <TopBar />
            <Sidebar />

            <main className="ml-60 p-8 overflow-y-auto">
                <ProfileSection />
            </main>
        </div>
    );
};

export default UserDashBoard;
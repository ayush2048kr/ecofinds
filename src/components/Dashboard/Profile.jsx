import React, { useState } from 'react';
import { Camera, Save, X, User, Mail, Phone, MapPin, Calendar, Edit3 } from 'lucide-react';

const Profile = () => {
    const [profileImage, setProfileImage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe', 
        userName: 'johndoe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
        bio: 'Passionate about sustainable living and eco-friendly products. Love finding unique vintage items and giving them a new home.',
        website: 'https://johndoe.com',
        dateOfBirth: '1990-01-01',
        joinDate: '2024-01-01'
    });

    const [errors, setErrors] = useState({});
    const [originalData, setOriginalData] = useState({...formData});

    const handleInputChange = (field) => (e) => {
        const value = e.target.value;
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({
                    ...prev,
                    image: 'Image size must be less than 5MB'
                }));
                return;
            }

            // Validate file type
            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({
                    ...prev,
                    image: 'Please select a valid image file'
                }));
                return;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                setProfileImage(e.target.result);
                setErrors(prev => ({
                    ...prev,
                    image: ''
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Required fields validation
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.userName.trim()) newErrors.userName = 'Username is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validation (basic)
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        // Username validation (alphanumeric and underscores only)
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (formData.userName && !usernameRegex.test(formData.userName)) {
            newErrors.userName = 'Username can only contain letters, numbers, and underscores';
        }

        // Website validation
        if (formData.website && formData.website.trim()) {
            const urlRegex = /^https?:\/\/.+\..+$/;
            if (!urlRegex.test(formData.website)) {
                newErrors.website = 'Please enter a valid website URL (including http:// or https://)';
            }
        }

        // Bio length validation
        if (formData.bio && formData.bio.length > 500) {
            newErrors.bio = 'Bio must be less than 500 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            console.log('Saving profile data:', { formData, profileImage });
            setOriginalData({...formData});
            setIsEditing(false);
            
            // Show success message
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Error saving profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({...originalData});
        setProfileImage('');
        setErrors({});
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const ProfileField = ({ icon, label, value, field, type = 'text', placeholder, multiline = false }) => {
        if (!isEditing) {
            return (
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className="flex-shrink-0 mt-1">
                        {icon}
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            {label}
                        </label>
                        <p className="text-gray-900">
                            {value || 'Not provided'}
                        </p>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex items-start gap-3 p-3">
                <div className="flex-shrink-0 mt-3">
                    {icon}
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                    {multiline ? (
                        <textarea
                            value={value}
                            onChange={handleInputChange(field)}
                            placeholder={placeholder}
                            rows={3}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors[field] ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                    ) : (
                        <input
                            type={type}
                            value={value}
                            onChange={handleInputChange(field)}
                            placeholder={placeholder}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors[field] ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                    )}
                    {errors[field] && (
                        <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h1>
                        <p className="text-gray-600">Manage your personal information and preferences</p>
                    </div>
                    {!isEditing ? (
                        <button
                            onClick={handleEdit}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Edit3 size={16} />
                            Edit Profile
                        </button>
                    ) : (
                        <div className="flex gap-3">
                            <button
                                onClick={handleSave}
                                disabled={isLoading}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Save size={16} />
                                {isLoading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={isLoading}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                            >
                                <X size={16} />
                                Cancel
                            </button>
                        </div>
                    )}
                </div>

                {/* Profile Picture */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="relative">
                        <div
                            className="w-32 h-32 rounded-full border-4 border-gray-200 bg-cover bg-center overflow-hidden"
                            style={{
                                backgroundImage: `url(${profileImage || 'https://via.placeholder.com/128x128/e5e7eb/9ca3af?text=Profile'})`
                            }}
                        />
                        {isEditing && (
                            <label
                                htmlFor="profileImageInput"
                                className="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors shadow-lg"
                            >
                                <Camera size={16} />
                            </label>
                        )}
                        <input
                            type="file"
                            id="profileImageInput"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            {formData.firstName} {formData.lastName}
                        </h2>
                        <p className="text-gray-600">@{formData.userName}</p>
                        <p className="text-sm text-gray-500 mt-1">
                            Member since {new Date(formData.joinDate).toLocaleDateString()}
                        </p>
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-2">{errors.image}</p>
                        )}
                    </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ProfileField
                            icon={<User className="w-4 h-4 text-gray-500" />}
                            label="First Name"
                            value={formData.firstName}
                            field="firstName"
                            placeholder="Enter your first name"
                        />
                        <ProfileField
                            icon={<User className="w-4 h-4 text-gray-500" />}
                            label="Last Name"
                            value={formData.lastName}
                            field="lastName"
                            placeholder="Enter your last name"
                        />
                    </div>

                    <ProfileField
                        icon={<User className="w-4 h-4 text-gray-500" />}
                        label="Username"
                        value={formData.userName}
                        field="userName"
                        placeholder="Choose a unique username"
                    />

                    <ProfileField
                        icon={<Mail className="w-4 h-4 text-gray-500" />}
                        label="Email Address"
                        value={formData.email}
                        field="email"
                        type="email"
                        placeholder="Enter your email address"
                    />

                    <ProfileField
                        icon={<Phone className="w-4 h-4 text-gray-500" />}
                        label="Phone Number"
                        value={formData.phone}
                        field="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                    />

                    <ProfileField
                        icon={<Calendar className="w-4 h-4 text-gray-500" />}
                        label="Date of Birth"
                        value={formData.dateOfBirth}
                        field="dateOfBirth"
                        type="date"
                    />

                    <ProfileField
                        icon={<User className="w-4 h-4 text-gray-500" />}
                        label="Bio"
                        value={formData.bio}
                        field="bio"
                        placeholder="Tell us about yourself..."
                        multiline={true}
                    />

                    <ProfileField
                        icon={<User className="w-4 h-4 text-gray-500" />}
                        label="Website"
                        value={formData.website}
                        field="website"
                        type="url"
                        placeholder="https://your-website.com"
                    />
                </div>

                {/* Address Information */}
                <div className="mt-8 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Address Information</h3>
                    
                    <ProfileField
                        icon={<MapPin className="w-4 h-4 text-gray-500" />}
                        label="Street Address"
                        value={formData.address}
                        field="address"
                        placeholder="Enter your street address"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <ProfileField
                            icon={<MapPin className="w-4 h-4 text-gray-500" />}
                            label="City"
                            value={formData.city}
                            field="city"
                            placeholder="Enter your city"
                        />
                        <ProfileField
                            icon={<MapPin className="w-4 h-4 text-gray-500" />}
                            label="State"
                            value={formData.state}
                            field="state"
                            placeholder="Enter your state"
                        />
                        <ProfileField
                            icon={<MapPin className="w-4 h-4 text-gray-500" />}
                            label="ZIP Code"
                            value={formData.zipCode}
                            field="zipCode"
                            placeholder="Enter your ZIP code"
                        />
                    </div>

                    <ProfileField
                        icon={<MapPin className="w-4 h-4 text-gray-500" />}
                        label="Country"
                        value={formData.country}
                        field="country"
                        placeholder="Enter your country"
                    />
                </div>
            </div>
        </div>
    );
};

export default Profile;

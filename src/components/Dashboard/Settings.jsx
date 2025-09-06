import React, { useState } from 'react';
import { Save, Bell, Shield, Eye, Globe, Trash2 } from 'lucide-react';

const Settings = () => {
    const [settings, setSettings] = useState({
        // Account Settings
        email: 'user@example.com',
        phone: '+1234567890',
        
        // Notification Settings
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        marketingEmails: true,
        
        // Privacy Settings
        profileVisibility: 'public', // public, friends, private
        showEmail: false,
        showPhone: false,
        dataCollection: true,
        
        // Display Settings
        language: 'en',
        currency: 'USD',
        theme: 'light', // light, dark, auto
        
        // Security Settings
        twoFactorAuth: false,
        loginAlerts: true
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (field, value) => {
        setSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Saving settings:', settings);
            alert('Settings saved successfully!');
        } catch (error) {
            alert('Error saving settings. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteAccount = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            alert('Account deletion requested. You will receive an email with further instructions.');
        }
    };

    const SettingSection = ({ icon, title, children }) => (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
                {icon}
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );

    const SettingRow = ({ label, description, children }) => (
        <div className="flex items-center justify-between py-2">
            <div className="flex-1">
                <label className="text-sm font-medium text-gray-700">{label}</label>
                {description && (
                    <p className="text-xs text-gray-500 mt-1">{description}</p>
                )}
            </div>
            <div className="ml-4">
                {children}
            </div>
        </div>
    );

    const Toggle = ({ checked, onChange }) => (
        <button
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                checked ? 'bg-blue-600' : 'bg-gray-300'
            }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    checked ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
        </button>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
                <p className="text-gray-600">Manage your account preferences and privacy settings</p>
            </div>

            {/* Account Settings */}
            <SettingSection
                icon={<Shield className="w-5 h-5 text-blue-600" />}
                title="Account Settings"
            >
                <SettingRow label="Email Address" description="Your primary email for account notifications">
                    <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </SettingRow>
                <SettingRow label="Phone Number" description="Used for SMS notifications and account recovery">
                    <input
                        type="tel"
                        value={settings.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </SettingRow>
            </SettingSection>

            {/* Notification Settings */}
            <SettingSection
                icon={<Bell className="w-5 h-5 text-green-600" />}
                title="Notifications"
            >
                <SettingRow label="Email Notifications" description="Receive updates about your listings and purchases">
                    <Toggle
                        checked={settings.emailNotifications}
                        onChange={(value) => handleInputChange('emailNotifications', value)}
                    />
                </SettingRow>
                <SettingRow label="Push Notifications" description="Get instant notifications on your device">
                    <Toggle
                        checked={settings.pushNotifications}
                        onChange={(value) => handleInputChange('pushNotifications', value)}
                    />
                </SettingRow>
                <SettingRow label="SMS Notifications" description="Receive important updates via text message">
                    <Toggle
                        checked={settings.smsNotifications}
                        onChange={(value) => handleInputChange('smsNotifications', value)}
                    />
                </SettingRow>
                <SettingRow label="Marketing Emails" description="Receive promotional content and special offers">
                    <Toggle
                        checked={settings.marketingEmails}
                        onChange={(value) => handleInputChange('marketingEmails', value)}
                    />
                </SettingRow>
            </SettingSection>

            {/* Privacy Settings */}
            <SettingSection
                icon={<Eye className="w-5 h-5 text-purple-600" />}
                title="Privacy & Visibility"
            >
                <SettingRow label="Profile Visibility" description="Who can see your profile information">
                    <select
                        value={settings.profileVisibility}
                        onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="public">Public</option>
                        <option value="friends">Friends Only</option>
                        <option value="private">Private</option>
                    </select>
                </SettingRow>
                <SettingRow label="Show Email Address" description="Display email in your public profile">
                    <Toggle
                        checked={settings.showEmail}
                        onChange={(value) => handleInputChange('showEmail', value)}
                    />
                </SettingRow>
                <SettingRow label="Show Phone Number" description="Display phone number in your public profile">
                    <Toggle
                        checked={settings.showPhone}
                        onChange={(value) => handleInputChange('showPhone', value)}
                    />
                </SettingRow>
                <SettingRow label="Data Collection" description="Allow us to collect usage data to improve our service">
                    <Toggle
                        checked={settings.dataCollection}
                        onChange={(value) => handleInputChange('dataCollection', value)}
                    />
                </SettingRow>
            </SettingSection>

            {/* Display Settings */}
            <SettingSection
                icon={<Globe className="w-5 h-5 text-orange-600" />}
                title="Display & Language"
            >
                <SettingRow label="Language" description="Choose your preferred language">
                    <select
                        value={settings.language}
                        onChange={(e) => handleInputChange('language', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                    </select>
                </SettingRow>
                <SettingRow label="Currency" description="Default currency for pricing">
                    <select
                        value={settings.currency}
                        onChange={(e) => handleInputChange('currency', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="CAD">CAD ($)</option>
                    </select>
                </SettingRow>
                <SettingRow label="Theme" description="Choose your preferred theme">
                    <select
                        value={settings.theme}
                        onChange={(e) => handleInputChange('theme', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                    </select>
                </SettingRow>
            </SettingSection>

            {/* Security Settings */}
            <SettingSection
                icon={<Shield className="w-5 h-5 text-red-600" />}
                title="Security"
            >
                <SettingRow label="Two-Factor Authentication" description="Add an extra layer of security to your account">
                    <Toggle
                        checked={settings.twoFactorAuth}
                        onChange={(value) => handleInputChange('twoFactorAuth', value)}
                    />
                </SettingRow>
                <SettingRow label="Login Alerts" description="Get notified when someone logs into your account">
                    <Toggle
                        checked={settings.loginAlerts}
                        onChange={(value) => handleInputChange('loginAlerts', value)}
                    />
                </SettingRow>
            </SettingSection>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Save size={18} />
                    {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
                
                <button
                    onClick={handleDeleteAccount}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                    <Trash2 size={18} />
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default Settings;

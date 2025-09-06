import React, { useState, useEffect } from 'react';

const Auth = () => {
    // State management
    const [activeTab, setActiveTab] = useState('signup');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showPasswords, setShowPasswords] = useState({
        signup: false,
        confirm: false,
        login: false
    });

    // Form states
    const [signupForm, setSignupForm] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    const [passwordStrength, setPasswordStrength] = useState({
        width: 0,
        color: 'bg-red-500',
        text: 'Weak'
    });

    // Initialize theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        setIsDarkMode(savedTheme === 'dark');
    }, []);

    // Theme toggle handler
    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    // Password visibility toggle
    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    // Password strength checker
    const checkPasswordStrength = (password) => {
        let strength = 0;
        const requirements = [
            /([a-z])/, // lowercase letters
            /([A-Z])/, // uppercase letters
            /([0-9])/, // numbers
            /([!@#$%^&*])/ // special characters
        ];

        requirements.forEach(req => {
            if (req.test(password)) strength++;
        });

        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;

        let width = 0;
        let color = '';
        let text = 'Weak';

        switch (strength) {
            case 0:
            case 1:
            case 2:
                width = 33;
                color = 'bg-red-500';
                text = 'Weak';
                break;
            case 3:
            case 4:
                width = 66;
                color = 'bg-yellow-500';
                text = 'Medium';
                break;
            case 5:
            case 6:
                width = 100;
                color = 'bg-green-500';
                text = 'Strong';
                break;
        }

        setPasswordStrength({ width, color, text });
    };

    // Form handlers
    const handleSignupChange = (field, value) => {
        setSignupForm(prev => ({ ...prev, [field]: value }));
        if (field === 'password') {
            checkPasswordStrength(value);
        }
    };

    const handleLoginChange = (field, value) => {
        setLoginForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        console.log("Sign up:", signupForm);
        // Add your signup logic here
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log("Login:", loginForm);
        // Add your login logic here
    };

    // Validation
    const isSignupValid = () => {
        return signupForm.password === signupForm.confirmPassword &&
            signupForm.password.length > 0 &&
            signupForm.displayName.trim() &&
            signupForm.email.trim();
    };

    const passwordsMatch = signupForm.password === signupForm.confirmPassword && signupForm.password.length > 0;

    // Icons
    const SunIcon = () => (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
            <line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="20" x2="12" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="2" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="20" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );

    const MoonIcon = () => (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
    );

    const EyeIcon = () => (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );

    const EyeOffIcon = () => (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
            <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.7 9.7 0 0 0 5.1-1.28" />
            <line x1="2" x2="22" y1="2" y2="22" />
        </svg>
    );

    return (
        <div className={`font-sans min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900 text-gray-50' : 'bg-gray-50 text-gray-900'}`}>
            <div className="min-h-screen flex flex-col items-center justify-center p-6">
                {/* Dark/Light Mode Toggle */}
                <button
                    onClick={toggleTheme}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:scale-110 transition-transform duration-200"
                >
                    {isDarkMode ? <SunIcon /> : <MoonIcon />}
                </button>

                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-3">
                        <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900 rounded-full">
                            <span className="text-4xl">🌱</span>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-slate-700 dark:text-slate-300 mb-3">EcoFinds</h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400">Giving Products a Second Chance</p>
                </div>

                {/* Main Content: Tabbed Forms */}
                <div className="w-full max-w-md">
                    <div className="w-full">
                        {/* Tabs List */}
                        <div className="grid w-full grid-cols-2 mb-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                            <button
                                onClick={() => setActiveTab('signup')}
                                className={`p-3 rounded-md transition-colors duration-200 ${activeTab === 'signup'
                                        ? 'bg-white dark:bg-gray-50 text-gray-900 dark:text-gray-900'
                                        : 'text-gray-500 dark:text-gray-500'
                                    }`}
                            >
                                Sign Up
                            </button>
                            <button
                                onClick={() => setActiveTab('login')}
                                className={`p-3 rounded-md transition-colors duration-200 ${activeTab === 'login'
                                        ? 'bg-white dark:bg-gray-50 text-gray-900 dark:text-gray-900'
                                        : 'text-gray-500 dark:text-gray-500'
                                    }`}
                            >
                                Login
                            </button>
                        </div>

                        {/* Tab Content */}
                        {/* Sign Up Form */}
                        {activeTab === 'signup' && (
                            <div className="rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-4">
                                <div className="text-center">
                                    <h2 className="text-2xl text-gray-900 dark:text-gray-50 font-semibold">Create Account</h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Join us in giving products a second chance</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label htmlFor="display-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Display Name</label>
                                        <input
                                            id="display-name"
                                            type="text"
                                            placeholder="Enter your display name"
                                            required
                                            value={signupForm.displayName}
                                            onChange={(e) => handleSignupChange('displayName', e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                        <input
                                            id="signup-email"
                                            type="email"
                                            placeholder="Enter your email"
                                            required
                                            value={signupForm.email}
                                            onChange={(e) => handleSignupChange('email', e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                        <div className="relative">
                                            <input
                                                id="signup-password"
                                                type={showPasswords.signup ? "text" : "password"}
                                                placeholder="Create a password"
                                                required
                                                value={signupForm.password}
                                                onChange={(e) => handleSignupChange('password', e.target.value)}
                                                className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => togglePasswordVisibility('signup')}
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-r-md"
                                            >
                                                {showPasswords.signup ? <EyeOffIcon /> : <EyeIcon />}
                                            </button>
                                        </div>
                                        {/* Password Strength Indicator */}
                                        <div className="mt-2">
                                            <div className="flex h-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                                <div
                                                    className={`h-full transition-all duration-300 ease-in-out ${passwordStrength.color}`}
                                                    style={{ width: `${passwordStrength.width}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                Password strength: {passwordStrength.text}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                                        <div className="relative">
                                            <input
                                                id="confirm-password"
                                                type={showPasswords.confirm ? "text" : "password"}
                                                placeholder="Confirm your password"
                                                required
                                                value={signupForm.confirmPassword}
                                                onChange={(e) => handleSignupChange('confirmPassword', e.target.value)}
                                                className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => togglePasswordVisibility('confirm')}
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-r-md"
                                            >
                                                {showPasswords.confirm ? <EyeOffIcon /> : <EyeIcon />}
                                            </button>
                                        </div>
                                        {!passwordsMatch && signupForm.confirmPassword && (
                                            <p className="text-sm text-red-600">Passwords do not match</p>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleSignupSubmit}
                                        disabled={!isSignupValid()}
                                        className="w-full rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:bg-gray-400 transition-colors duration-200"
                                    >
                                        Create Account
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Login Form */}
                        {activeTab === 'login' && (
                            <div className="rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-4">
                                <div className="text-center">
                                    <h2 className="text-2xl text-gray-900 dark:text-gray-50 font-semibold">Welcome Back</h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Sign in to your account to continue</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                        <input
                                            id="login-email"
                                            type="email"
                                            placeholder="Enter your email"
                                            required
                                            value={loginForm.email}
                                            onChange={(e) => handleLoginChange('email', e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                        <div className="relative">
                                            <input
                                                id="login-password"
                                                type={showPasswords.login ? "text" : "password"}
                                                placeholder="Enter your password"
                                                required
                                                value={loginForm.password}
                                                onChange={(e) => handleLoginChange('password', e.target.value)}
                                                className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => togglePasswordVisibility('login')}
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-r-md"
                                            >
                                                {showPasswords.login ? <EyeOffIcon /> : <EyeIcon />}
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLoginSubmit}
                                        className="w-full rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors duration-200"
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
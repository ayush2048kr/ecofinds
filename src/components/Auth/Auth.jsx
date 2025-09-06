import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    // State management
    const [activeTab, setActiveTab] = useState('login');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
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

    const navigate = useNavigate();

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

    // Enhanced error handling
    const getErrorMessage = (error) => {
        switch (error.code) {
            case 'auth/user-not-found':
                return 'No account found with this email address';
            case 'auth/wrong-password':
                return 'Incorrect password. Please try again';
            case 'auth/email-already-in-use':
                return 'An account with this email already exists';
            case 'auth/weak-password':
                return 'Password should be at least 6 characters long';
            case 'auth/invalid-email':
                return 'Please enter a valid email address';
            case 'auth/too-many-requests':
                return 'Too many failed attempts. Please try again later';
            default:
                return error.message || 'An error occurred. Please try again';
        }
    };

    // Form handlers
    const handleSignupChange = (field, value) => {
        setSignupForm(prev => ({ ...prev, [field]: value }));
        if (field === 'password') {
            checkPasswordStrength(value);
        }
        // Clear errors when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleLoginChange = (field, value) => {
        setLoginForm(prev => ({ ...prev, [field]: value }));
        // Clear errors when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        // Validation
        const newErrors = {};
        if (!signupForm.displayName.trim()) newErrors.displayName = 'Display name is required';
        if (!signupForm.email.trim()) newErrors.email = 'Email is required';
        if (!signupForm.password) newErrors.password = 'Password is required';
        if (signupForm.password !== signupForm.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (signupForm.password && signupForm.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, signupForm.email, signupForm.password);
            await updateProfile(userCredential.user, {
                displayName: signupForm.displayName
            });
            
            // Clear form
            setSignupForm({ displayName: '', email: '', password: '', confirmPassword: '' });
            
            // Success feedback
            alert('🎉 Account created successfully! Welcome to EcoFinds!');
            navigate('/');
        } catch (error) {
            setErrors({ general: getErrorMessage(error) });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        // Validation
        const newErrors = {};
        if (!loginForm.email.trim()) newErrors.email = 'Email is required';
        if (!loginForm.password) newErrors.password = 'Password is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
            
            // Clear form
            setLoginForm({ email: '', password: '' });
            
            // Success feedback
            alert('✅ Welcome back! You have been logged in successfully.');
            navigate('/');
        } catch (error) {
            setErrors({ general: getErrorMessage(error) });
        } finally {
            setIsLoading(false);
        }
    };

    // Validation
    const isSignupValid = () => {
        return signupForm.password === signupForm.confirmPassword &&
            signupForm.password.length >= 6 &&
            signupForm.displayName.trim() &&
            signupForm.email.trim();
    };

    const isLoginValid = () => {
        return loginForm.email.trim() && loginForm.password;
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
                {/* Back to Home Button */}
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-4 left-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:scale-110 transition-transform duration-200 flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="hidden sm:inline text-sm font-medium">Back</span>
                </button>

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
                        {/* General Error Message */}
                        {errors.general && (
                            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                <p className="text-red-600 dark:text-red-400 text-sm">{errors.general}</p>
                            </div>
                        )}

                        {/* Tabs List */}
                        <div className="grid w-full grid-cols-2 mb-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                            <button
                                onClick={() => setActiveTab('login')}
                                className={`p-3 rounded-md transition-colors duration-200 ${activeTab === 'login'
                                    ? 'bg-white dark:bg-gray-50 text-gray-900 dark:text-gray-900'
                                    : 'text-gray-500 dark:text-gray-500'
                                    }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setActiveTab('signup')}
                                className={`p-3 rounded-md transition-colors duration-200 ${activeTab === 'signup'
                                    ? 'bg-white dark:bg-gray-50 text-gray-900 dark:text-gray-900'
                                    : 'text-gray-500 dark:text-gray-500'
                                    }`}
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Login Form */}
                        {activeTab === 'login' && (
                            <form onSubmit={handleLoginSubmit} className="rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-4">
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
                                            className={`flex h-10 w-full rounded-md border ${errors.email ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                                            disabled={isLoading}
                                        />
                                        {errors.email && <p className="text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
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
                                                className={`flex h-10 w-full rounded-md border ${errors.password ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10`}
                                                disabled={isLoading}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => togglePasswordVisibility('login')}
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-r-md"
                                                disabled={isLoading}
                                            >
                                                {showPasswords.login ? <EyeOffIcon /> : <EyeIcon />}
                                            </button>
                                        </div>
                                        {errors.password && <p className="text-sm text-red-600 dark:text-red-400">{errors.password}</p>}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={!isLoginValid() || isLoading}
                                        className="w-full rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Signing In...
                                            </div>
                                        ) : (
                                            'Sign In'
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Sign Up Form */}
                        {activeTab === 'signup' && (
                            <form onSubmit={handleSignupSubmit} className="rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-4">
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
                                            className={`flex h-10 w-full rounded-md border ${errors.displayName ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                                            disabled={isLoading}
                                        />
                                        {errors.displayName && <p className="text-sm text-red-600 dark:text-red-400">{errors.displayName}</p>}
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
                                            className={`flex h-10 w-full rounded-md border ${errors.email ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                                            disabled={isLoading}
                                        />
                                        {errors.email && <p className="text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
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
                                                className={`flex h-10 w-full rounded-md border ${errors.password ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10`}
                                                disabled={isLoading}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => togglePasswordVisibility('signup')}
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-r-md"
                                                disabled={isLoading}
                                            >
                                                {showPasswords.signup ? <EyeOffIcon /> : <EyeIcon />}
                                            </button>
                                        </div>
                                        {/* Password Strength Indicator */}
                                        {signupForm.password && (
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
                                        )}
                                        {errors.password && <p className="text-sm text-red-600 dark:text-red-400">{errors.password}</p>}
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
                                                className={`flex h-10 w-full rounded-md border ${errors.confirmPassword ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-900 px-3 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10`}
                                                disabled={isLoading}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => togglePasswordVisibility('confirm')}
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-r-md"
                                                disabled={isLoading}
                                            >
                                                {showPasswords.confirm ? <EyeOffIcon /> : <EyeIcon />}
                                            </button>
                                        </div>
                                        {!passwordsMatch && signupForm.confirmPassword && (
                                            <p className="text-sm text-red-600 dark:text-red-400">Passwords do not match</p>
                                        )}
                                        {errors.confirmPassword && <p className="text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={!isSignupValid() || isLoading}
                                        className="w-full rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Creating Account...
                                            </div>
                                        ) : (
                                            'Create Account'
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;

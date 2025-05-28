// src/app/components/Login.tsx
'use client';
import { signIn } from "next-auth/react";
import React, { useState, useEffect } from 'react';
import { UserLoginCheck, Userlogincreate, ForgotPasswordRequest } from '@/services/Manage_services';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

type FormData = {
    FullName?: string;
    Email: string;
    Password: string;
};

type LoginProps = {
    onClose: () => void;
    onLoginSuccess: (user: any) => void;
};

const Login: React.FC<LoginProps> = ({ onClose, onLoginSuccess }) => {
    const [isSignup, setIsSignup] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [formData, setFormData] = useState<FormData>({ FullName: '', Email: '', Password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);

        const { FullName, Email, Password } = formData;

        try {
            if (isForgotPassword) {
                if (!Email) {
                    setErrorMessage('Please enter your email.');
                    setLoading(false);
                    return;
                }

                const response = await ForgotPasswordRequest(Email);

                if (response?.isSuccess) {
                    toast.success('Password reset instructions sent to your email.');
                    setIsForgotPassword(false);
                } else {
                    toast.error(response?.message || 'Failed to send reset link.');
                }
                setLoading(false); // Set loading false here
                return;
            }

            if (isSignup) {
                if (!FullName || !Email || !Password) {
                    setErrorMessage('All fields are required.');
                    setLoading(false);
                    return;
                }

                const signupResponse = await Userlogincreate({ FullName, Email, Password });
                if (signupResponse?.isSuccess) {
                    toast.success('Sign-up successful! Please login.');
                    setIsSignup(false);
                    setFormData({ FullName: '', Email, Password });
                } else {
                    toast.error(signupResponse?.data?.message || 'Signup failed.');
                }
                setLoading(false); // Set loading false here
            } else {
                if (!Email || !Password) {
                    setErrorMessage('Email and password are required.');
                    setLoading(false);
                    return;
                }

                const loginResponse = await UserLoginCheck({ Email, Password });

                if (!loginResponse?.userDetails || !loginResponse.isSuccess) {
                    toast.error('Invalid login credentials.');
                    setLoading(false);
                    return;
                }

                const userData = loginResponse.userDetails;

                sessionStorage.setItem('user', 'true');
                localStorage.setItem('userData', JSON.stringify(userData));

                toast.success('Login successful!');
                onLoginSuccess(userData);
                onClose();
            }
        } catch (err: any) {
            console.error('Auth Error:', err);
            toast.error(err?.response?.data?.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div className="modal d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {isSignup ? (
                                'Sign Up'
                            ) : isForgotPassword ? (
                                'Forgot Password'
                            ) : (
                                <>
                                    Welcome Back to <br /> <span style={{ fontWeight: 800 }}> Razvi Darul Ifta Bareilly </span>
                                </>
                            )}
                        </h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close">X</button>
                    </div>

                    <div className="modal-body">
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        <form onSubmit={handleSubmit}>
                            {isSignup && (
                                <div className="form-group">
                                    <label className="form-label">Full Name *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="FullName"
                                        value={formData.FullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            )}

                            <div className="form-group">
                                <label className="form-label">Email *</label>
                                <div className="input-group">
                                    <input
                                        type="email"
                                        className="form-control rounded-start-0"
                                        name="Email"
                                        value={formData.Email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span className="input-group-text rounded-end-0">
                                        📧
                                    </span>
                                </div>
                            </div>

                            {!isForgotPassword && (
                                <div className="form-group">
                                    <label className="form-label">Password *</label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className="form-control rounded-end-0"
                                            name="Password"
                                            value={formData.Password}
                                            onChange={handleChange}
                                            required
                                        />
                                        <button
                                            className="btn btn-outline-secondary rounded-start-0"
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            <button type="submit" className="btn btn-success w-100" disabled={loading}>
                                {loading
                                    ? 'Please wait...'
                                    : isForgotPassword
                                        ? 'Send Reset Link'
                                        : isSignup
                                            ? 'Sign Up'
                                            : 'Login'}
                            </button>

                            {!isSignup && !isForgotPassword && (
                                <div className="mt-2 text-end">
                                    <button type="button" className="btn btn-link p-0" onClick={() => setIsForgotPassword(true)}>
                                        Forgot Password?
                                    </button>
                                </div>
                            )}

                            {!isForgotPassword && (
                                <>
                                    <div className="d-flex align-items-center justify-content-center mt-3">
                                        <hr className="w-50" />
                                        <span className="mx-2 text-muted">or</span>
                                        <hr className="w-50" />
                                    </div>

                                    <button
                                        type="button"
                                        className="btn btn-light w-100 mt-3 d-flex align-items-center justify-content-center border"
                                        style={{ boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.25)', borderRadius: '8px' }}
                                        onClick={() => signIn("google")}
                                    >
                                        <FcGoogle className="me-2" size={24} />
                                        Continue with Google
                                    </button>
                                </>
                            )}

                            <p className="mt-3 text-center">
                                {isSignup ? (
                                    <>
                                        Already have an account?{' '}
                                        <button type="button" className="btn btn-link p-0" onClick={() => setIsSignup(false)}>
                                            Login here
                                        </button>
                                    </>
                                ) : isForgotPassword ? (
                                    <>
                                        Remember your password?{' '}
                                        <button type="button" className="btn btn-link p-0" onClick={() => setIsForgotPassword(false)}>
                                            Login here
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        New user?{' '}
                                        <button type="button" className="btn btn-link p-0" onClick={() => setIsSignup(true)}>
                                            Sign up here
                                        </button>
                                    </>
                                )}
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

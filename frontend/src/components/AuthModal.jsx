import { useState } from "react";
import { X, UserPlus, Mail, Lock, LogIn, Loader, ArrowRight } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const AuthModal
 = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login & Signup
    const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });

    const { login, signup, loading } = useUserStore();
AuthModal
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            login(formData.email, formData.password);
        } else {
            signup(formData);
        }
    };
    if (!isOpen) return null; // Prevents modal from rendering if not open

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
            <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg flex min-h-[550px] max-h-[90vh] overflow-y-auto">
                {/* Left Side */}
                <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-black text-white rounded-l-lg p-6">
                    <span className="text-8xl font-bold">Z</span>
                    <p className="text-sm text-gray-300 mt-4 text-center">
                        {isLogin ? `"Welcome back to ZenCart!"` : `"Join ZenCart – Your ultimate shopping destination!"`}
                    </p>
                </div>

                {/* Right Side */}
                <div className="w-full md:w-1/2 p-6 relative flex flex-col justify-center">
                    {/* Close Button */}
                    <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 cursor-pointer">
                        <X size={24} />
                    </button>
                    <h2 className="text-xl font-semibold mb-4 text-center">
                        {isLogin ? "Login to Your Account" : "Create an Account"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        {/* Name (Only for Signup) */}
                        {!isLogin && (
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-800"
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        {/* Email */}
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-800"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-800"
                                required
                            />
                        </div>

                        {/* Confirm Password (Only for Signup) */}
                        {!isLogin && (
                            <div className="relative">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-800"
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 rounded text-white bg-emerald-600 hover:bg-emerald-700 transition duration-200 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader className="mr-2 h-5 w-5 animate-spin" /> {isLogin ? "Logging in..." : "Signing up..."}
                                </>
                            ) : (
                                <>
                                    {isLogin ? "Login" : "Sign Up"}
                                </>
                            )}
                        </button>
                    </form>

                    {/* Terms & Switch to Login/Signup */}
                    {!isLogin && (
                        <p className="text-xs text-gray-500 mt-3 text-center">
                            By joining, you agree to our <a href="#" className="text-emerald-600">Terms of Service</a>.
                        </p>
                    )}
                    <p className="text-sm text-center mt-4">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button onClick={() => setIsLogin(!isLogin)} className="text-emerald-600 font-semibold hover:underline">
                            {isLogin ? "Sign up here" : "Login here"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthModal
;

import { ShoppingCart, LogIn, LogOut, X, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import AuthModal from "./AuthModal";
import LogoutModel from "./LogoutModel";
import { MdDashboard } from "react-icons/md";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [signupOpen, setSignupOpen] = useState(false);
    const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false); // Logout Confirmation State
    const { user, logout } = useUserStore();
    const { cart } = useCartStore();
    const profileRef = useRef(null); // Reference for profile menu


    const navigate = useNavigate();


    // Close profile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleScroll = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        } else {
            // Navigate to Home first, then scroll
            navigate(`/#${id}`);
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }, 500);
        }
        
    };

    const handleMobileScroll = (id) => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
          setMenuOpen(false); // Close the menu if it's open (for mobile)
        } else {
            // Navigate to Home first, then scroll
            navigate(`/#${id}`);
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }, 500);
        }
        
      };
      
    


    // Extract first letter and capitalize
    const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "");

    const handleCartClick = () => {
        if (user) {
            navigate("/cart");
        } else {
            setSignupOpen(true);
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-gray-900">ZenCart</Link>

                <nav className="hidden md:flex space-x-6">
                <button onClick={() => handleScroll("home")} className="text-gray-700 hover:text-black">Home</button>
                    <button onClick={() => handleScroll("categories")} className="text-gray-700 hover:text-black">Categories</button>
                    <button onClick={() => handleScroll("featured")} className="text-gray-700 hover:text-black">Featured</button>

                </nav>

                <div className="flex items-center space-x-4 relative">
                <button onClick={handleCartClick} className="relative cursor-pointer">
                        <ShoppingCart className="text-gray-700 hover:text-black" size={24} />
                        {cart?.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                {cart?.length}
                            </span>
                        )}
                    </button>
                    <div className="hidden md:flex">
                        {user ? (
                            <div className="relative " ref={profileRef}>
                                <button
                                    className="w-10 h-10 flex items-center justify-center cursor-pointer rounded-full bg-gray-800 text-white font-semibold"
                                    onClick={() => setProfileOpen(!profileOpen)}
                                >
                                    {getInitial(user.name)}
                                </button>

                                {/* profile open popup */}

                                {profileOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden text-">
                                        {/* User Info */}
                                        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                                            <p className="text-gray-900 font-medium">{user.name}</p>
                                            <p className="text-gray-600 text-xs">{user.email}</p>
                                        </div>

                                        <Link
                                                to="/orders"
                                                className="flex px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
                                            >
                                                Order Details
                                            </Link>
                                        {/* Admin Dashboard Link (Only for Admins) */}
                                        {user?.role === 'admin' && (
                                            <Link
                                                to="/admin-suite"
                                                className="flex px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
                                            >
                                                Dashboard
                                            </Link>
                                        )}

                                        {/* Logout Button */}
                                        <button
                                            onClick={() => setConfirmLogoutOpen(true)}
                                            className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}


                            </div>
                        ) : (
                            <div className="hidden md:flex space-x-3">
                                <button
                                    onClick={() => setSignupOpen(true)}
                                    className="bg-transparent border border-gray-600 text-gray-600 px-1.5 py-1 rounded-md hover:bg-gray-600 hover:text-white transition"
                                >
                                    Join
                                </button>

                            </div>
                        )}
                    </div>

                    <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={28} className="text-gray-900" /> : <Menu size={28} className="text-gray-900" />}
                    </button>
                </div>
            </div>

            <div
                className={`fixed top-0 left-0 w-full h-full bg-white z-50 transform ${menuOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 md:hidden`}
            >
                {/* Header with Close Button */}
                <div className="flex justify-between items-center p-6 ">
                    <Link to="/" className="text-2xl font-bold text-gray-900">ZenCart</Link>
                    <button onClick={() => setMenuOpen(false)}>
                        <X size={28} className="text-gray-900" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col items-center space-y-6 pt-8">
                <button onClick={() => handleMobileScroll("home")} className="text-gray-700 text-lg hover:text-black">
  Home
</button>
<button onClick={() => handleMobileScroll("categories")} className="text-gray-700 text-lg hover:text-black">
  Categories
</button>
<button onClick={() => handleMobileScroll("featured")} className="text-gray-700 text-lg hover:text-black">
  Featured
</button>

{
    user && <Link
    to="/orders"
    onClick={() => setMenuOpen(false)} // ✅ Use an arrow function
    className="flex px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
>
    Order Details
</Link>

}

                    {user ? (
                        
                        <div className="mt-6 w-full flex flex-col items-center text-center">

                            {/* Admin Dashboard (Only for Admins) */}
                            {user?.role === 'admin' && (
                                <Link
                                    to="/admin-suite"
                                    className="  text-center border border-gray-600 text-gray-600 py-1 px-1.5 rounded-md hover:bg-blue-600 hover:text-white transition"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Admin Suite
                                </Link>
                            )}

                            {/* User Profile */}

                            <p className="text-gray-900 font-medium mt-2">{user.name}</p>
                            <p className="text-gray-600 text-sm">{user.email}</p>

                            {/* Logout Button */}
                            <button
                                onClick={() => setConfirmLogoutOpen(true)}
                                className="mt-4 w-40 text-center border border-red-600 text-red-600 py-2 rounded-md hover:bg-red-600 hover:text-white transition"
                            >
                                <LogOut size={18} className="inline-block mr-2" /> Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-3 mt-6 w-full items-center">
                            <button
                                onClick={() => setSignupOpen(true)}
                                className="w-40 text-center border border-emerald-600 text-emerald-600 py-2 rounded-md hover:bg-emerald-600 hover:text-white transition"
                            >
                                Join
                            </button>
                        </div>
                    )}
                </nav>
            </div>


            {!user && <AuthModal isOpen={signupOpen} onClose={() => setSignupOpen(false)} />}

            {confirmLogoutOpen && (
                <LogoutModel logout={logout} setConfirmLogoutOpen={setConfirmLogoutOpen} setProfileOpen={setProfileOpen} />
            )}
        </header>
    );
};

export default Navbar;

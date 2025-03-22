import React from 'react'

const LogoutModel = ({logout,setConfirmLogoutOpen,setProfileOpen}) => {
  return (
<div className="fixed inset-0 flex items-center justify-center bg-black/50  z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                        <p className="text-gray-800 text-lg font-semibold">Are you sure you want to logout?</p>
                        <div className="mt-4 flex justify-center space-x-4">
                            <button
                                onClick={() => {
                                    logout();
                                    setConfirmLogoutOpen(false);
                                    setProfileOpen(false);
                                }}
                                className="bg-black text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                            >
                                Yes, Logout
                            </button>
                            <button
                                onClick={() => setConfirmLogoutOpen(false)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>  )
}

export default LogoutModel
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import LoadingSpinner from "./components/LoadingSpinner";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import UserOrders from "./pages/UserOrders";
import AdminOrders from "./pages/AdminOrders";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
	const { getCartItems } = useCartStore();

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  useEffect(() => {
		if (!user) return;

		getCartItems();
	}, [getCartItems, user]);


  if (checkingAuth) return <LoadingSpinner/>;


  return (
    <div className="min-h-screen bg-[#FAF7F5] text-[#222325] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.02)_45%,rgba(0,0,0,0.01)_100%)] " />
        </div>
      </div>

      <div className="relative z-50 pt-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin-suite" element={user?.role === "admin" ? <AdminPage /> : <Navigate to="/" />} />
          <Route path="/adminorders" element={user?.role === "admin" ? <AdminOrders /> : <Navigate to="/" />} />

          <Route path="/category/:category" element={ <CategoryPage /> } />

          <Route path="/cart" element={user? <CartPage/>:<Navigate to="/" /> } />

          <Route
						path='/purchase-success'
						element={user ? <PurchaseSuccessPage /> : <Navigate to='/' />}
					/>

          <Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/' />} />
          <Route path='/orders' element={user ? <UserOrders /> : <Navigate to='/' />} />



          {/* 🔥 Catch-all route for unknown URLs */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Toaster/>
    </div>
  );
}

export default App;

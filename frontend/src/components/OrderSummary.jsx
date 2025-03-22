import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51PqHYkRwegqfzFlIr7eOpgvl7bqijBmXhmUErPakfbCuQupn5Rb30QZtuCNHp8gu3FF6ZNq0WVIIYVG6gncOzNQB00fzv8xzKa");

const OrderSummary = () => {
	const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();
	const savings = subtotal - total;
	const formattedSubtotal = subtotal.toFixed(2);
	const formattedTotal = total.toFixed(2);
	const formattedSavings = savings.toFixed(2);
	const [isProcessing, setIsProcessing] = useState(false); // Prevent duplicate requests

	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState({
		street: "",
		city: "",
		state: "",
		postalCode: "",
		country: "",
	});
	const [loading, setLoading] = useState(true);

	// Fetch user address when component mounts
	useEffect(() => {
		const fetchAddress = async () => {
			try {
				const res = await axios.get("/users/address", { withCredentials: true });
				setPhone(res.data.phone || "");
				setAddress(res.data.address || {});
			} catch (error) {
				console.error("Error fetching address:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchAddress();
	}, []);

	// Handle address submission
	const handleAddressSubmit = async () => {
		try {
			await axios.put(
				"/users/address",
				{ phone, ...address },
				{ withCredentials: true }
			);
			alert("Address updated successfully!");
		} catch (error) {
			console.error("Error updating address:", error);
			alert("Failed to update address.");
		}
	};

	// Handle checkout with address

	const handlePayment = async () => {
		if (isProcessing) return; // Prevent multiple clicks
		setIsProcessing(true); // Set loading state
	
		const stripe = await stripePromise;
		const latestAddress = { ...address };
		const latestPhone = phone;
	
		try {
			const res = await axios.post("/payments/create-checkout-session", {
				products: cart,
				couponCode: coupon ? coupon.code : null,
				phone: latestPhone,
				address: latestAddress,
			});
	
			const session = res.data;
			const result = await stripe.redirectToCheckout({ sessionId: session.id });
	
			if (result.error) {
				console.error("Error:", result.error);
			}
		} catch (error) {
			console.error("Error in checkout:", error);
		} finally {
			setIsProcessing(false); // Reset loading state
		}
	};
	
	if (loading) return <p>Loading...</p>;

	return (
		<motion.div
			className="space-y-4 rounded-lg border border-gray-300 bg-white p-5 shadow-lg sm:p-6"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<p className="text-xl font-semibold text-black">Order Summary</p>

			{/* Order Pricing Details */}
			<div className="space-y-4">
				<div className="space-y-2">
					<dl className="flex items-center justify-between gap-4">
						<dt className="text-base font-normal text-gray-700">Original Price</dt>
						<dd className="text-base font-medium text-black">${formattedSubtotal}</dd>
					</dl>

					{savings > 0 && (
						<dl className="flex items-center justify-between gap-4">
							<dt className="text-base font-normal text-gray-700">Savings</dt>
							<dd className="text-base font-medium text-gray-900">-${formattedSavings}</dd>
						</dl>
					)}

					{coupon && isCouponApplied && (
						<dl className="flex items-center justify-between gap-4">
							<dt className="text-base font-normal text-gray-700">Coupon ({coupon.code})</dt>
							<dd className="text-base font-medium text-gray-900">-{coupon.discountPercentage}%</dd>
						</dl>
					)}

					<dl className="flex items-center justify-between gap-4 border-t border-gray-400 pt-2">
						<dt className="text-base font-bold text-black">Total</dt>
						<dd className="text-base font-bold text-gray-900">${formattedTotal}</dd>
					</dl>
				</div>

				{/* Address Input Section */}
				<div className="space-y-3">
					<p className="font-semibold text-gray-700">Shipping Details</p>

					<input
						type="text"
						placeholder="Phone Number"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						className="w-full rounded-md border p-2"
					/>

					<input
						type="text"
						placeholder="Street Address"
						value={address.street}
						onChange={(e) => setAddress({ ...address, street: e.target.value })}
						className="w-full rounded-md border p-2"
					/>

					<input
						type="text"
						placeholder="City"
						value={address.city}
						onChange={(e) => setAddress({ ...address, city: e.target.value })}
						className="w-full rounded-md border p-2"
					/>

					<div className="flex gap-2">
						<input
							type="text"
							placeholder="State"
							value={address.state}
							onChange={(e) => setAddress({ ...address, state: e.target.value })}
							className="w-1/2 rounded-md border p-2"
						/>
						<input
							type="text"
							placeholder="Postal Code"
							value={address.postalCode}
							onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
							className="w-1/2 rounded-md border p-2"
						/>
					</div>

					<input
						type="text"
						placeholder="Country"
						value={address.country}
						onChange={(e) => setAddress({ ...address, country: e.target.value })}
						className="w-full rounded-md border p-2"
					/>

					<button
						className="w-full bg-gray-700 text-white p-2 rounded-md"
						onClick={handleAddressSubmit}
					>
						Save Address
					</button>
				</div>

				{/* Checkout Button */}
				<motion.button
    className={`w-full p-2 rounded-md transition-all flex justify-center items-center gap-2 ${
        isProcessing ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-gray-900"
    } text-white`}
    whileHover={!isProcessing ? { scale: 1.05 } : {}}
    whileTap={!isProcessing ? { scale: 0.95 } : {}}
    onClick={handlePayment}
    disabled={isProcessing}
>
    {isProcessing ? (
        <>
            <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3m-3 3l-3-3m7 11a8 8 0 01-8 8v-4l-3 3m3-3l3 3"
                ></path>
            </svg>
            Processing...
        </>
    ) : (
        "Proceed to Checkout"
    )}
</motion.button>


				{/* Continue Shopping */}
				<div className="flex items-center justify-center gap-2">
					<span className="text-sm font-normal text-gray-700">or</span>
					<Link
						to="/"
						className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-black transition"
					>
						Continue Shopping
						<MoveRight size={16} />
					</Link>
				</div>
			</div>
		</motion.div>
	);
};

export default OrderSummary;

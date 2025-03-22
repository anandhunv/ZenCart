import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
	const { clearCart } = useCartStore();
	const [error, setError] = useState(null);

	useEffect(() => {
		const handleCheckoutSuccess = async (sessionId) => {
			try {
				await axios.post("/payments/checkout-success", { sessionId });
				clearCart();
				
			} catch (error) {
				console.error(error);
			} finally {
				setIsProcessing(false);
			}
		};

		const sessionId = new URLSearchParams(window.location.search).get("session_id");
		if (sessionId) {
			handleCheckoutSuccess(sessionId);
		} else {
			setIsProcessing(false);
			setError("No session ID found in the URL");
		}
	}, [clearCart]);

	if (isProcessing) return <div className="flex items-center justify-center h-screen text-lg">Processing...</div>;

	if (error) return <div className="flex items-center justify-center h-screen text-lg text-red-600">Error: {error}</div>;

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
			<Confetti width={window.innerWidth} height={window.innerHeight} gravity={0.1} numberOfPieces={700} recycle={false} />

			<div className="w-full max-w-lg bg-white rounded-xl shadow-md border border-gray-200 p-8 text-center">
				<CheckCircle className="text-green-500 w-24 h-24 mx-auto mb-6" />
				<h1 className="text-3xl font-bold text-gray-900 mb-3">Purchase Successful!</h1>
				<p className="text-gray-600 text-lg">Thank you for your order. We're processing it now.</p>
				<p className="text-green-500 text-sm mt-2">Check your email for order details and updates.</p>

				<div className="border-t border-gray-200 mt-6 pt-4 bg-gray-50 rounded-lg p-4">
					<div className="flex items-center justify-between text-gray-700">
						<span className="text-sm">Order number</span>
						<span className="text-sm font-semibold text-green-500">#12345</span>
					</div>
					<div className="flex items-center justify-between text-gray-700 mt-2">
						<span className="text-sm">Estimated delivery</span>
						<span className="text-sm font-semibold text-green-500">3-5 business days</span>
					</div>
				</div>

				<div className="mt-6 space-y-4">
					<button className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 rounded-lg transition flex items-center justify-center">
						<HandHeart className="mr-2" size={20} />
						Thanks for trusting us!
					</button>
					<Link to="/" className="w-full bg-gray-900 hover:bg-gray-700 text-white text-lg font-semibold py-3 rounded-lg transition flex items-center justify-center">
						Continue Shopping
						<ArrowRight className="ml-2" size={20} />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PurchaseSuccessPage;

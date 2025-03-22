import { XCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-lg bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
			>
				<div className="p-8 text-center">
					<XCircle className="text-red-500 w-24 h-24 mx-auto mb-6" />
					<h1 className="text-3xl font-bold text-gray-900 mb-3">Payment Cancelled</h1>
					<p className="text-gray-600 text-lg">
						Your order was cancelled. No charges were made to your account.
					</p>
				</div>

				<div className="border-t border-gray-200 p-6 bg-gray-50">
					<p className="text-sm text-gray-700 text-center">
						If you faced any issues during checkout, please contact our support team.
					</p>
				</div>

				<div className="p-6">
					<Link
						to="/"
						className="w-full flex items-center justify-center bg-gray-900 text-white text-lg font-semibold py-3 rounded-lg hover:bg-gray-700 transition"
					>
						<ArrowLeft className="mr-2" size={20} />
						Return to Shop
					</Link>
				</div>
			</motion.div>
		</div>
	);
};

export default PurchaseCancelPage;

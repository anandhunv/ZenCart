import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";

const ProductDetailsModal = ({ product, onClose }) => {
	const { addToCart } = useCartStore();

	const handleAddToCart = () => {
		addToCart({ ...product, quantity: 1 });
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
			<motion.div
				className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row relative"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
			>
				{/* Close Button */}
				<button 
					className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl"
					onClick={onClose}
				>
					&times;
				</button>

				{/* Left Side - Image */}
				<div className="w-full md:w-1/2 h-64 md:h-auto">
					<img 
						className="w-full h-full object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
						src={product.image} 
						alt={product.name} 
					/>
				</div>

				{/* Right Side - Details */}
				<div className="w-full md:w-1/2 p-6 flex flex-col">
					<h2 className="text-2xl font-bold">{product.name}</h2>
					<p className="text-gray-600 mt-2">{product.description}</p>
					<p className="text-2xl font-semibold text-gray-900 mt-4">${product.price.toFixed(2)}</p>

					{/* Add to Cart Button */}
					<button
						className="mt-auto w-full bg-emerald-500 text-white py-3 rounded-md hover:bg-emerald-600 transition"
						onClick={handleAddToCart}
					>
						Add to Cart
					</button>
				</div>
			</motion.div>
		</div>
	);
};

export default ProductDetailsModal;

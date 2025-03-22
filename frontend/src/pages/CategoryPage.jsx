import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import ProductDetailsModal from "../components/ProductDetailsModal";

const CategoryPage = () => {
	const { fetchProductsByCategory, products } = useProductStore();
	console.log(products);
	const { category } = useParams();

	const [sortBy, setSortBy] = useState("default");
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState(null);

	useEffect(() => {
		fetchProductsByCategory(category);
	}, [fetchProductsByCategory, category]);

	useEffect(() => {
		let sortedProducts = [...products];

		if (sortBy === "priceLowHigh") {
			sortedProducts.sort((a, b) => a.price - b.price);
		} else if (sortBy === "priceHighLow") {
			sortedProducts.sort((a, b) => b.price - a.price);
		}

		setFilteredProducts(sortedProducts);
	}, [products, sortBy]);

	const openModal = (product) => {
		setSelectedProduct(product);
	};

	const closeModal = () => {
		setSelectedProduct(null);
	};

	return (
		<div className="min-h-screen bg-white text-gray-900">
			<div className="relative z-10 max-w-screen-xl mx-auto px-6 py-16">
				<motion.h1
					className="text-center text-4xl sm:text-5xl font-bold mb-12"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{category.charAt(0).toUpperCase() + category.slice(1)}
				</motion.h1>

				{/* Filter Section */}
				<div className="flex justify-end mb-6">
					<select
						className="border border-gray-300 text-gray-700 text-sm rounded-lg px-4 py-2 focus:outline-0 focus:border-emerald-400"
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value)}
					>
						<option value="default">Sort By</option>
						<option value="priceLowHigh">Price: Low to High</option>
						<option value="priceHighLow">Price: High to Low</option>
					</select>
				</div>

				{filteredProducts.length === 0 ? (
					<div className="flex flex-col items-center justify-center h-96">
						<motion.h2
							className="text-3xl font-semibold text-gray-500"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5 }}
						>
							No products found!
						</motion.h2>
					</div>
				) : (
					<motion.div
						className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						{filteredProducts.map((product) => (
							<ProductCard key={product._id} product={product} onClick={() => openModal(product)} />
						))}
					</motion.div>
				)}
			</div>

			{/* Product Details Modal */}
			{selectedProduct && <ProductDetailsModal product={selectedProduct} onClose={closeModal} />}
		</div>
	);
};

export default CategoryPage;

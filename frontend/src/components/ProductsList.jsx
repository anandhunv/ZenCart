import { useState } from "react";
import { motion } from "framer-motion";
import { Trash, Star, Loader, Search } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
	const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();
	const [deletingProductId, setDeletingProductId] = useState(null);
	const [confirmDeleteId, setConfirmDeleteId] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");

	const handleDeleteClick = (productId) => {
		setConfirmDeleteId(productId);
	};

	const confirmDelete = async () => {
		if (confirmDeleteId) {
			setDeletingProductId(confirmDeleteId);
			await deleteProduct(confirmDeleteId);
			setDeletingProductId(null);
			setConfirmDeleteId(null);
		}
	};

	// Filter products based on search query
	const filteredProducts = products?.filter(
		(product) =>
			product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			product.category.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<motion.div
			className='bg-white shadow-md rounded-lg overflow-hidden max-w-4xl mx-auto border border-gray-200'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<div className='p-4 bg-gray-100 flex items-center gap-2 border-b border-gray-200'>
				<Search className='text-gray-500' />
				<input
					type='text'
					placeholder='Search by name or category...'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className='w-full bg-white text-gray-800 px-3 py-2 border border-gray-300 rounded-md  focus:border-blue-500 outline-none'
				/>
			</div>

			<table className='min-w-full divide-y divide-gray-200'>
				<thead className='bg-gray-100'>
					<tr>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
							Product
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
							Price
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
							Category
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
							Featured
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>
							Actions
						</th>
					</tr>
				</thead>

				<tbody className='bg-white divide-y divide-gray-200'>
					{filteredProducts.length > 0 ? (
						filteredProducts.map((product) => (
							<tr key={product._id} className='hover:bg-gray-50'>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex items-center'>
										<img className='h-10 w-10 rounded-full object-cover' src={product.image} alt={product.name} />
										<span className='ml-4 text-sm font-medium text-gray-800'>{product.name}</span>
									</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>${product.price.toFixed(2)}</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>{product.category}</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<button
										onClick={() => toggleFeaturedProduct(product._id)}
										className={`p-1 rounded-full ${
											product.isFeatured ? "bg-yellow-400 text-white" : "bg-gray-300 text-gray-600"
										} hover:bg-yellow-500 transition-colors duration-200`}
									>
										<Star className='h-5 w-5' />
									</button>
								</td>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
									<button
										onClick={() => handleDeleteClick(product._id)}
										className='text-red-500 hover:text-red-400'
									>
										<Trash className='h-5 w-5' />
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan='5' className='px-6 py-4 text-center text-gray-500'>
								No products found.
							</td>
						</tr>
					)}
				</tbody>
			</table>

			{/* Delete Confirmation Modal */}
			{confirmDeleteId && (
				<div className='fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-30'>
					<div className='bg-white p-6 rounded-lg shadow-lg border border-gray-300'>
						<h2 className='text-lg text-gray-800'>Are you sure you want to delete this product?</h2>
						<div className='mt-4 flex justify-end space-x-4'>
							<button
								onClick={() => setConfirmDeleteId(null)}
								className='px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors'
							>
								Cancel
							</button>
							<button
								onClick={confirmDelete}
								className='px-4 py-2 bg-red-500 text-white rounded-md flex items-center space-x-2 hover:bg-red-400 transition-all'
								disabled={deletingProductId === confirmDeleteId}
							>
								{deletingProductId === confirmDeleteId ? (
									<>
										<Loader className='h-5 w-5 animate-spin' />
										<span>Deleting...</span>
									</>
								) : (
									<span>Confirm</span>
								)}
							</button>
						</div>
					</div>
				</div>
			)}
		</motion.div>
	);
};

export default ProductsList;

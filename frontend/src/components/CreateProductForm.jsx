import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags","watches"];

const CreateProductForm = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
	});

	const { createProduct, loading } = useProductStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(newProduct);
		try {
			await createProduct(newProduct);
			setNewProduct({ name: "", description: "", price: "", category: "", image: "" });
		} catch {
			console.log("Error creating product");
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setNewProduct({ ...newProduct, image: reader.result });
			};

			reader.readAsDataURL(file);
		}
	};

	return (
		<motion.div
			className='bg-white shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto border border-gray-200'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h2 className='text-2xl font-semibold mb-6 text-gray-600 text-center'>Create New Product</h2>

			<form onSubmit={handleSubmit} className='space-y-5'>
				<div>
					<label htmlFor='name' className='block text-sm font-medium text-gray-700'>
						Product Name
					</label>
					<input
						type='text'
						id='name'
						name='name'
						value={newProduct.name}
						onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						className='mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 
						text-gray-800 focus:outline-none   focus:border-gray-500'
						required
					/>
				</div>

				<div>
					<label htmlFor='description' className='block text-sm font-medium text-gray-700'>
						Description
					</label>
					<textarea
						id='description'
						name='description'
						value={newProduct.description}
						onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
						rows='3'
						className='mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 
						text-gray-800 focus:outline-none   focus:border-gray-500'
						required
					/>
				</div>

				<div className='flex gap-4'>
					<div className='w-1/2'>
						<label htmlFor='price' className='block text-sm font-medium text-gray-700'>
							Price ($)
						</label>
						<input
							type='number'
							id='price'
							name='price'
							value={newProduct.price}
							onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
							step='0.01'
							className='mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 
							text-gray-800 focus:outline-none   focus:border-gray-500'
							required
						/>
					</div>

					<div className='w-1/2'>
						<label htmlFor='category' className='block text-sm font-medium text-gray-700'>
							Category
						</label>
						<select
							id='category'
							name='category'
							value={newProduct.category}
							onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
							className='mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 
							text-gray-800 focus:outline-none   focus:border-gray-500'
							required
						>
							<option value=''>Select a category</option>
							{categories.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className='mt-1 flex flex-col items-center text-center'>
					<input type='file' id='image' className='sr-only' accept='image/*' onChange={handleImageChange} />
					<label
						htmlFor='image'
						className='cursor-pointer bg-gray-200 py-2 px-4 border border-gray-300 rounded-md shadow-sm 
						text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none  '
					>
						<Upload className='h-5 w-5 inline-block mr-2' />
						Upload Image
					</label>
					{newProduct.image && (
						<img
							src={newProduct.image}
							alt='Uploaded'
							className='mt-3 w-24 h-24 object-cover rounded-md border border-gray-300'
						/>
					)}
				</div>

				<button
					type='submit'
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm 
					text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 
					focus:outline-none  focus:ring-offset-2  disabled:opacity-50'
					disabled={loading}
				>
					{loading ? (
						<>
							<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
							Creating...
						</>
					) : (
						<>
							<PlusCircle className='mr-2 h-5 w-5' />
							Create Product
						</>
					)}
				</button>
			</form>
		</motion.div>
	);
};

export default CreateProductForm;

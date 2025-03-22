import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CategoryItem = ({ category }) => {
	return (
		<Link
			to={"/category" + category.href}
			className="group block rounded-2xl overflow-hidden shadow-lg bg-white transition-all duration-300 hover:shadow-2xl"
		>
			<div className="relative w-full h-64 overflow-hidden">
				<motion.img
					src={category.imageUrl}
					alt={category.name}
					className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
					whileHover={{ scale: 1.1 }}
					loading="lazy"
				/>

				{/* Overlay effect */}
				<div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300"></div>

				{/* Category Name Text */}
				<div className="absolute inset-0 flex items-center justify-center">
					<h3 className="text-white text-2xl font-bold group-hover:scale-105 transition-transform duration-300">
						{category.name}
					</h3>
				</div>
			</div>
		</Link>
	);
};

export default CategoryItem;

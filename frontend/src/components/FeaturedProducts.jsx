import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

const FeaturedProducts = ({ featuredProducts }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(4);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) setItemsPerPage(1);
			else if (window.innerWidth < 1024) setItemsPerPage(2);
			else if (window.innerWidth < 1280) setItemsPerPage(3);
			else setItemsPerPage(4);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
	};

	const isStartDisabled = currentIndex === 0;
	const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

	return (
		<div className='py-12 bg-gray-100 ' id="featured">
			<div className='container mx-auto px-4'>
				<h2 className='text-center text-4xl sm:text-5xl font-bold text-gray-900 mb-6'>Featured Products</h2>
				<div className='relative flex items-center'>
					{/* Left Arrow */}
					<button
						onClick={prevSlide}
						disabled={isStartDisabled}
						className={`absolute left-0 z-30 p-3 rounded-full shadow-md transition-all ${
							isStartDisabled ? "opacity-50 cursor-not-allowed" : "bg-white hover:bg-gray-200"
						}`}
					>
						<ChevronLeft className='w-6 h-6 text-gray-700' />
					</button>

					{/* Product Cards */}
					<div className='overflow-hidden w-full'>
						<div
							className='flex transition-transform duration-300 ease-in-out'
							style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
						>
							{featuredProducts?.map((product) => (
								<div key={product._id} className='w-full sm:w-1/3 lg:w-1/3 xl:w-1/5 flex-shrink-0 px-4 justify-items-center'>
									<ProductCard product={product} />
								</div>
							))}
						</div>
					</div>

					{/* Right Arrow */}
					<button
						onClick={nextSlide}
						disabled={isEndDisabled}
						className={`absolute right-0 p-3 rounded-full shadow-md transition-all ${
							isEndDisabled ? "opacity-50 cursor-not-allowed" : "bg-white hover:bg-gray-200"
						}`}
					>
						<ChevronRight className='w-6 h-6 text-gray-700' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default FeaturedProducts;

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CategoryItem from "../components/CategoryItem";
import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import WhyChooseUs from "../components/WhyChooseUs";
import DealsCarousel from "../components/DealsCarousel";
import { useLocation } from "react-router-dom";

// Categories Section
const categories = [
	{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.avif" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.avif" },
	{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.avif" },
	{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.avif" },
	{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
	{ href: "/suits", name: "Suits", imageUrl: "/suits.avif" },
	{ href: "/bags", name: "Bags", imageUrl: "/bags.avif" },
	{ href: "/watches", name: "Watches", imageUrl: "/watches.avif" },
];

// Fashion Trends Banner Data
const fashionTrends = [
		{ title: "Minimalist Aesthetics", subtitle: "Simplicity is elegance", imageUrl: "https://wallpapercave.com/wp/wp12596505.jpg" },
	{ title: "New Spring Collection", subtitle: "Trendy outfits for 2025",  imageUrl: "https://wallpapercave.com/wp/wp7915280.jpg"},
	{ title: "Luxury Handbags", subtitle: "The finest leather craftsmanship", imageUrl: "https://wallpapercave.com/wp/wp4329529.jpg" },
	{ title: "Retro Sneakers", subtitle: "Bring back the 90s look", imageUrl: "https://wallpapercave.com/wp/wp12241432.jpg" },
];

const HomePage = () => {

	const location = useLocation();

   
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);


	useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth" });
                }, 500);
            }
        }
    }, [location]);


	return (
		<div className="relative min-h-screen " id="home">
			
			{/* 🔥 Fashion Trends Banner */}
			<div className="relative w-full">
				<Swiper
					modules={[Navigation, Pagination, Autoplay]}
					spaceBetween={0}
					slidesPerView={1}
					autoplay={{ delay: 4000 }}
					loop={true}
					navigation
					pagination={{ clickable: true }}
					className="w-full h-[250px] sm:h-[500px] md:h-[550px]"
				>
					{fashionTrends.map((trend, index) => (
						<SwiperSlide key={index}>
							<div className="relative w-full h-full">
								<img
									src={trend.imageUrl}
									alt={trend.title}
									className="w-full h-full object-cover"
								/>
								<div className="absolute inset-0 bg-black/40 bg-opacity-40 flex flex-col items-center justify-center text-white text-center p-6">
									<motion.h2
										initial={{ opacity: 0, y: -20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, ease: "easeOut" }}
										className="text-3xl sm:text-4xl md:text-5xl font-extrabold"
									>
										{trend.title}
									</motion.h2>
									<motion.p
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
										className="text-lg sm:text-xl mt-3"
									>
										{trend.subtitle}
									</motion.p>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			{/* 🛍 Explore Categories Section */}
<div className="max-w-7xl mx-auto px-6 sm:px-8 py-16" id="categories">
    <h1 className="text-center text-4xl sm:text-5xl font-extrabold text-gray-900">
        Explore Our Categories
    </h1>
    <p className="text-center text-lg text-gray-600 mt-3">
        Discover the latest trends in fashion and accessories.
    </p>
    <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((category) => (
            <div key={category.name} className="aspect- w-full overflow-hidden rounded-lg shadow-md">
                <CategoryItem category={category} />
            </div>
        ))}
    </div>
</div>



<DealsCarousel/>

{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products}  />}

<WhyChooseUs/>
<Footer/>

		</div>
	);
};

export default HomePage;

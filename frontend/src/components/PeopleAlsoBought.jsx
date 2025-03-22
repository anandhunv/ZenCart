import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import ProductDetailsModal from "./ProductDetailsModal";

const PeopleAlsoBought = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product for modal

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get("/products/recommendations");
        setRecommendations(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred while fetching recommendations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="mt-8">
      {/* Section Title */}
      <h3 className="text-2xl font-semibold text-black mb-4">People also bought</h3>

      {/* Scrollable Product List */}
      <div className="relative">
        <div className="flex overflow-x-auto scrollbar-hide px-1 py-2">
          {recommendations.map((product) => (
            <div 
              key={product._id} 
              className="min-w-[250px] md:min-w-[280px] lg:min-w-[300px]"
              onClick={() => setSelectedProduct(product)} // Open modal on click
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} // Close modal
        />
      )}
    </div>
  );
};

export default PeopleAlsoBought;

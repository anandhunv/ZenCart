import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import toast from "react-hot-toast";

const ProductCard = ({ product,onClick }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    }
    addToCart(product);
  };
  return (
    <div className="relative w-[180px] h-[240px]  rounded-xl overflow-hidden shadow-lg group cursor-pointer" onClick={onClick}> 
      {/* Background Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      
      {/* Product Info */}
      <div className="absolute bottom-3 left-3 right-3 text-white">
        <h5 className="text-sm font-semibold truncate">{product.name}</h5>
        <p className="text-xs opacity-80">${product.price}</p>
      </div>
      
      {/* Add to Cart Button */}
      <button
        className="absolute bottom-3 z-50 cursor-pointer right-3 bg-white text-black p-2 rounded-full shadow-md opacity-90 hover:opacity-100 transition"
        onClick={(e) => {
          e.stopPropagation(); // ✅ Stops the click from triggering the parent div
          handleAddToCart();
        }}      >
        <ShoppingCart size={16} />
      </button>
    </div>
  );
};

export default ProductCard;

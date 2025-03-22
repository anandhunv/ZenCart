import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import toast from "react-hot-toast";

const CartItem = ({ item, index }) => {
  const { removeFromCart, updateQuantity, cart } = useCartStore();

  const handleRemoveItem = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="text-gray-900">Are you sure you want to remove this item?</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                removeFromCart(item._id);
                toast.dismiss(t.id);
                toast.success("Item removed successfully");
              }}
              className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity === 1) {
      toast(
        (t) => (
          <div className="flex flex-col gap-2">
            <p className="text-gray-900">Quantity will be zero. Do you want to remove the item?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  removeFromCart(item._id);
                  toast.dismiss(t.id);
                  toast.success("Item removed successfully");
                }}
                className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={() => toast.dismiss(t.id)}
                className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                No
              </button>
            </div>
          </div>
        ),
        { duration: 5000 }
      );
    } else {
      updateQuantity(item._id, item.quantity - 1);
    }
  };

  return (
    <div
      key={item._id}
      className={`grid grid-cols-1 sm:grid-cols-6 items-center gap-4 p-4 ${
        index !== cart.length - 1 ? "border-b border-gray-300" : ""
      }`}
    >
      {/* Product */}
      <div className="flex items-center gap-4 col-span-2">
        <img className="h-16 w-16 rounded object-cover" src={item.image} alt={item.name} />
        <div>
          <p className="text-base font-medium text-gray-900">{item.name}</p>
          <p className="text-sm text-gray-500">{item.description}</p>
        </div>
      </div>

      {/* Mobile Quantity */}
      <div className="sm:hidden flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center">
          <p className="text-gray-700 font-semibold">Quantity:</p>
          <div className="flex items-center gap-3">
            <button
              className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 transition"
              onClick={handleDecreaseQuantity}
            >
              <Minus className="text-gray-600" size={18} />
            </button>
            <p className="text-gray-900 font-semibold text-lg">{item.quantity}</p>
            <button
              className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 transition"
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >
              <Plus className="text-gray-600" size={18} />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-700 font-semibold">Price:</p>
          <p className="text-gray-900 font-semibold">${item.price}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-700 font-semibold">Total:</p>
          <p className="text-gray-900 font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-700 font-semibold">Remove:</p>
          <button
            className="text-red-500 hover:text-red-400 p-2 rounded-md transition cursor-pointer"
            onClick={handleRemoveItem}
          >
            <Trash size={20} />
          </button>
        </div>
      </div>

      {/* Desktop Quantity */}
      <div className="hidden sm:flex items-center justify-center gap-3 col-span-1">
        <button
          className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 transition"
          onClick={handleDecreaseQuantity}
        >
          <Minus className="text-gray-600" size={18} />
        </button>
        <p className="text-gray-900 font-semibold text-lg">{item.quantity}</p>
        <button
          className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 transition"
          onClick={() => updateQuantity(item._id, item.quantity + 1)}
        >
          <Plus className="text-gray-600" size={18} />
        </button>
      </div>

      {/* Desktop Price */}
      <div className="hidden sm:block text-center col-span-1">
        <p className="text-gray-900 font-semibold">${item.price}</p>
      </div>

      {/* Desktop Total Price */}
      <div className="hidden sm:block text-center col-span-1">
        <p className="text-gray-900 font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
      </div>

      {/* Desktop Delete Button */}
      <div className="hidden sm:block text-center col-span-1">
        <button
          className="text-red-500 hover:text-red-400 p-2 rounded-md transition"
          onClick={handleRemoveItem}
        >
          <Trash size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;

import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";
import CartItem from "../components/CartItem";


const CartPage = () => {
	const { cart } = useCartStore();

	return (
		<div className='py-8 md:py-16 bg-white'>
			<div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
				<div className='mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8'>
					<motion.div
						className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						{cart.length === 0 ? (
							<EmptyCartUI />
						) : (
							<div className="bg-white p-6 rounded-2xl shadow-lg">
  {/* Desktop Headings */}
  <div className="hidden sm:grid grid-cols-6 gap-4 font-bold text-gray-700 pb-4">
    <p className="col-span-2">Product</p>
    <p className="col-span-1 text-center">Quantity</p>
    <p className="col-span-1 text-center">Price</p>
    <p className="col-span-1 text-center">Total Price</p>
    <p className="col-span-1 text-center">Remove</p>
  </div>

  {/* Cart Items */}
  {cart.map((item,index) => (
   									<CartItem key={item._id} item={item} index={index}/>

  ))}
</div>
						)}
						{cart.length > 0 && <PeopleAlsoBought />}
					</motion.div>

					{cart.length > 0 && (
						<motion.div
							className='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full'
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<OrderSummary />
							<GiftCouponCard />
						</motion.div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CartPage;

const EmptyCartUI = () => (
	<motion.div
		className='flex flex-col items-center justify-center space-y-4 py-16'
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<ShoppingCart className='h-24 w-24 text-gray-300' />
		<h3 className='text-2xl font-semibold '>Your cart is empty</h3>
		<p className='text-gray-400'>Looks like you {"haven't"} added anything to your cart yet.</p>
		<Link
			className='mt-4 rounded-md bg-black px-6 py-2 text-white transition-colors hover:bg-emerald-600'
			to='/'
		>
			Start Shopping
		</Link>
	</motion.div>
);
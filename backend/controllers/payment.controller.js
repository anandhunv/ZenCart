import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import { stripe } from "../lib/stripe.js";

export const createCheckoutSession = async (req, res) => {
	try {
		const { products, couponCode,phone, address  } = req.body;

		if (!Array.isArray(products) || products.length === 0) {
			return res.status(400).json({ error: "Invalid or empty products array" });
		}
		if (!phone || !address) {
			return res.status(400).json({ error: "Phone and address are required" });
		}
		let totalAmount = 0;

		const lineItems = products.map((product) => {
			const amount = Math.round(product.price * 100); // stripe wants u to send in the format of cents
			totalAmount += amount * product.quantity;

			return {
				price_data: {
					currency: "usd",
					product_data: {
						name: product.name,
						images: [product.image],
					},
					unit_amount: amount,
				},
				quantity: product.quantity || 1,
			};
		});

		let coupon = null;
		if (couponCode) {
			coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true });
			if (coupon) {
				totalAmount -= Math.round((totalAmount * coupon.discountPercentage) / 100);
			}
		}

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: lineItems,
			mode: "payment",
			success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
			discounts: coupon
				? [
						{
							coupon: await createStripeCoupon(coupon.discountPercentage),
						},
				  ]
				: [],
			metadata: {
				userId: req.user._id.toString(),
				couponCode: couponCode || "",
				phone, // Store phone
				address: JSON.stringify(address), // Store address as string
				products: JSON.stringify(
					products.map((p) => ({
						id: p._id,
						quantity: p.quantity,
						price: p.price,
					}))
				),
			},
		});

		if (totalAmount >= 20) {
			await createNewCoupon(req.user._id);
		}
		res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });
	} catch (error) {
		console.error("Error processing checkout:", error);
		res.status(500).json({ message: "Error processing checkout", error: error.message });
	}
};

export const checkoutSuccess = async (req, res) => {
	try {
	  const { sessionId } = req.body;
	  const session = await stripe.checkout.sessions.retrieve(sessionId);
  
	  if (session.payment_status === "paid") {
		// ✅ Check if order already exists (Prevents duplicate orders)
		const existingOrder = await Order.findOne({ stripeSessionId: sessionId });
  
		if (existingOrder) {
		  return res.status(400).json({ message: "Order already exists", orderId: existingOrder._id });
		}
  
		// Extract phone and address
		const phone = session.metadata.phone;
		const address = JSON.parse(session.metadata.address);
		const products = JSON.parse(session.metadata.products);
  
		// ✅ Create order only if it does not exist
		const newOrder = new Order({
		  user: session.metadata.userId,
		  phone, // Save phone
		  address, // Save address
		  products: products.map((product) => ({
			product: product.id,
			quantity: product.quantity,
			price: product.price,
		  })),
		  totalAmount: session.amount_total / 100, // Convert from cents to dollars
		  stripeSessionId: sessionId, // ✅ Save session ID to prevent duplicates
		});
  


		await newOrder.save();
  
		res.status(200).json({
		  success: true,
		  message: "Payment successful, order created, and coupon deactivated if used.",
		  orderId: newOrder._id,
		});
	  }
	} catch (error) {
	  console.error("Error processing successful checkout:", error);
	  res.status(500).json({ message: "Error processing successful checkout", error: error.message });
	}
  };
  

async function createStripeCoupon(discountPercentage) {
	const coupon = await stripe.coupons.create({
		percent_off: discountPercentage,
		duration: "once",
	});

	return coupon.id;
}

async function createNewCoupon(userId) {
	await Coupon.findOneAndDelete({ userId });

	const newCoupon = new Coupon({
		code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
		discountPercentage: 10,
		expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
		userId: userId,
	});

	await newCoupon.save();

	return newCoupon;
}
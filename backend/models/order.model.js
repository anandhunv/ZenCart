import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		products: [
			{
				product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
				quantity: { type: Number, required: true },
				price: { type: Number, required: true },
			},
		],
		totalAmount: {
			type: Number,
			required: true,
		},
		stripeSessionId: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		address: {
			type: Object, // Storing address as an object
			required: true,
		},
		status: {
            type: String,
            enum: ["Pending", "Out for Delivery", "Delivered"],
            default: "Pending",
        },
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model("Order", orderSchema);
export default Order;

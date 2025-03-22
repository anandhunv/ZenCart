import Order from "../models/order.model.js";

export const getUserOrders = async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user._id }).populate("products.product");
      
      res.json(orders.map(order => ({
        _id: order._id,
        totalAmount: order.totalAmount,
        phone: order.phone,
        address: order.address,
        status: order.status,  // ✅ Ensure status is included

        products: order.products.map(p => ({
          product: p.product,
          quantity: p.quantity,
          price: p.price
        })),
      })));
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Error fetching orders" });
    }
  };

  export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email") // ✅ Populate user details
            .populate("products.product", "name image price"); // ✅ Populate product details

        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Error fetching orders", error });
    }
};

// ✅ Update Order Status (Out for Delivery & Delivered)
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (!["Out for Delivery", "Delivered"].includes(status)) {
            return res.status(400).json({ message: "Invalid status update" });
        }

        order.status = status;
        await order.save();

        res.json({ message: `Order marked as ${status}`, order });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

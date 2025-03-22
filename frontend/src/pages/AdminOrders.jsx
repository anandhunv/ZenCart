import { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, Clock, Truck, User } from "lucide-react";
import axiosInstance from "../lib/axios";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get("/orders/admin/orders", {
                    withCredentials: true,
                });
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    // ✅ Update Order Status (Out for Delivery & Delivered)
    const handleUpdateOrderStatus = async (orderId, status) => {
        try {
            const response = await axiosInstance.put(`/orders/admin/orders/${orderId}/update`,
                { status },
                { withCredentials: true }
            );

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId ? { ...order, status: response.data.order.status } : order
                )
            );
        } catch (error) {
            console.error(`Error updating order status to ${status}:`, error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">All Orders</h2>

            {orders.length === 0 ? (
                <p className="text-gray-500 text-lg text-center">No orders found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full bg-white shadow-md rounded-lg border border-gray-200">
                        {/* Table Head */}
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-left">
                                <th className="p-4">Order ID</th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Order Date</th>
                                <th className="p-4">Total</th>
                                <th className="p-4">Address</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Products</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} className="border-b">
                                    {/* Order ID */}
                                    <td className="p-4 text-gray-600">#{order._id.slice(-6)}</td>

                                    {/* Customer Details */}
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <User className="w-6 h-6 text-gray-600" />
                                            <div>
                                                <p className="font-semibold text-gray-900">{order.user?.name || "Guest"}</p>
                                                <p className="text-gray-500 text-sm">{order.user?.email}</p>
                                                <p className="text-gray-500 text-sm">{order.phone}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Order Date */}
                                    <td className="p-4 text-gray-600">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>

                                    {/* Total Amount */}
                                    <td className="p-4 font-semibold text-green-600">${order.totalAmount}</td>

                                    {/* Address */}
                                    <td className="p-4 text-gray-600">
                                        {order.address.street}, {order.address.city}
                                    </td>

                                    {/* Order Status */}
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                                order.status === "Delivered"
                                                    ? "bg-green-100 text-green-800"
                                                    : order.status === "Out for Delivery"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                            }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>

                                    {/* Product List */}
                                    <td className="p-4 text-gray-600">
                                        {order.products.map((product, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <img
                                                    src={product.product?.image || "https://via.placeholder.com/50"}
                                                    alt={product.product?.name || "Product"}
                                                    className="w-12 h-12 object-cover rounded border"
                                                />
                                                <div>
                                                    <p className="text-gray-900 font-medium">{product.product?.name || "Unknown"}</p>
                                                    <p className="text-gray-600 text-sm">{product.quantity} x ${product.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </td>

                                    {/* Action Buttons */}
                                    <td className="p-4">
                                        {order.status === "Pending" && (
                                            <button
                                                onClick={() => handleUpdateOrderStatus(order._id, "Out for Delivery")}
                                                className="flex items-center gap-2 px-3 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition"
                                            >
                                                <Clock className="w-5 h-5" /> Start Delivery
                                            </button>
                                        )}
                                        {order.status === "Out for Delivery" && (
                                            <button
                                                onClick={() => handleUpdateOrderStatus(order._id, "Delivered")}
                                                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                                            >
                                                <Truck className="w-5 h-5" /> Mark Delivered
                                            </button>
                                        )}
                                        {order.status === "Delivered" && (
                                            <div className="flex items-center gap-2 px-3 py-2 bg-green-400 text-white font-semibold rounded-md">
                                                <CheckCircle className="w-5 h-5" /> Delivered
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;

    import { useEffect, useState } from "react";
    import axios from "axios";
import axiosInstance from "../lib/axios";

    const UserOrders = () => {
        const [orders, setOrders] = useState([]);

        useEffect(() => {
            const fetchOrders = async () => {
                try {
                    const response = await axiosInstance.get("/orders/my-orders", {
                        withCredentials: true, // Ensures authentication cookies are sent
                    });
                    console.log(response.data);
                    setOrders(response.data);
                } catch (error) {
                    console.error("Error fetching orders:", error);
                }
            };

            fetchOrders();
        }, []);

        // ✅ Function to format timestamp into a readable date
        const formatDate = (dateString) => {
            return new Date(dateString).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });
        };

        // ✅ Extract date from MongoDB ObjectId (fallback when `createdAt` is missing)
        const getCreatedDateFromObjectId = (objectId) => {
            return new Date(parseInt(objectId.substring(0, 8), 16) * 1000).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });
        };

        return (
            <div className="container mx-auto p-6">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">My Orders</h2>

                {orders.length === 0 ? (
                    <p className="text-gray-500 text-lg text-center">No orders found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-white shadow-md hover:shadow-lg rounded-lg p-5 border border-gray-200 transition-transform transform hover:-translate-y-2"
                            >
                                {/* ✅ Product Images */}
                                <div className="flex gap-2 overflow-x-auto pb-2">
                                    {order.products.map((product, index) => (
                                        <img
                                            key={index}
                                            src={product.product.image || "https://via.placeholder.com/150"}
                                            alt={product.product.name || "Product Image"}
                                            className="w-20 h-20 object-cover rounded-lg border"
                                        />
                                    ))}
                                </div>

                                {/* Order Details */}
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    Order ID: <span className="text-blue-600">{order._id}</span>
                                </h3>
                                <p className="text-gray-700 font-medium">
                                    Total: <span className="text-green-600 font-bold">${order.totalAmount}</span>
                                </p>

                                {/* 📌 Order Status */}
                                <p className="text-gray-700 font-medium">
                                    Status:{" "}
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                            order.status === "Delivered"
                                                ? "bg-green-200 text-green-800"
                                                : order.status === "Out for Delivery"
                                                ? "bg-blue-200 text-blue-800"
                                                : "bg-yellow-200 text-yellow-800"
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                </p>

                                {/* 📌 Ordered Date & Time */}
                                <p className="text-gray-500 text-sm">
                                    Ordered on:{" "}
                                    {order.createdAt
                                        ? formatDate(order.createdAt)
                                        : getCreatedDateFromObjectId(order._id)}
                                </p>

                                {/* Shipping Information */}
                                <div className="mt-4">
                                    <h4 className="text-sm font-semibold text-gray-600">Shipping Details:</h4>
                                    <p className="text-gray-700">
                                        <span className="font-semibold">Phone:</span> {order.phone}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-semibold">Address:</span> {order.address.street},{" "}
                                        {order.address.city}, {order.address.state}, {order.address.postalCode}
                                    </p>
                                </div>

                                {/* Product List */}
                                <div className="mt-4">
                                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Products:</h4>
                                    <ul className="space-y-2">
                                        {order.products.map((product, index) => (
                                            <li
                                                key={index}
                                                className="flex items-center justify-between p-2 border border-gray-300 rounded-md"
                                            >
                                                <p className="font-medium text-gray-800">{product.product.name}</p>
                                                <p className="text-blue-600">{product.quantity} x ${product.price}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    export default UserOrders;

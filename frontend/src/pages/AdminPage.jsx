import { BarChart, ClipboardList, PlusCircle, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import AdminOrders from "./AdminOrders"; // ✅ Import AdminOrders
import { useProductStore } from "../stores/useProductStore";

const tabs = [
	{ id: "create", label: "Create Product", icon: PlusCircle },
	{ id: "products", label: "Products", icon: ShoppingBasket },
	{ id: "analytics", label: "Analytics", icon: BarChart },
	{ id: "orders", label: "Orders", icon: ClipboardList }, // ✅ New Orders Tab
];

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("create");
	const { fetchAllProducts } = useProductStore();

	useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);

	return (
		<div className="min-h-screen bg-white">
			<div className="container mx-auto px-4 py-10 lg:py-16">
				<motion.h1
					className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-gray-800 text-center"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					Admin Dashboard
				</motion.h1>

				{/* Tabs Section */}
				<div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base transition-colors duration-200 ${
								activeTab === tab.id
									? "bg-gray-700 text-white"
									: "bg-gray-300 text-gray-800 hover:bg-gray-400"
							}`}
						>
							<tab.icon className="mr-2 h-5 w-5" />
							{tab.label}
						</button>
					))}
				</div>

				{/* Render Tabs */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="col-span-1 md:col-span-2">
						{activeTab === "create" && <CreateProductForm />}
						{activeTab === "products" && <ProductsList />}
						{activeTab === "analytics" && <AnalyticsTab />}
						{activeTab === "orders" && <AdminOrders />} {/* ✅ Orders Component */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminPage;

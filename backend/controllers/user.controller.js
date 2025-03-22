import User from "../models/user.model.js";

// Get user address
export const getUserAddress = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("phone address");
		if (!user) return res.status(404).json({ message: "User not found" });

		res.json(user);
	} catch (error) {
		res.status(500).json({ message: "Error fetching address", error });
	}
};

// Update address & phone number
export const updateUserAddress = async (req, res) => {
	try {
		const { phone, street, city, state, postalCode, country } = req.body;

		const updatedUser = await User.findByIdAndUpdate(
			req.user.id,
			{
				phone,
				address: { street, city, state, postalCode, country },
			},
			{ new: true }
		).select("phone address");

		res.json({ message: "Address updated successfully", user: updatedUser });
	} catch (error) {
		res.status(500).json({ message: "Failed to update address", error });
	}
};

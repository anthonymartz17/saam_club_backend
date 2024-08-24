const express = require("express");
const users = express.Router();
const { verifyToken } = require("../middleware/auth.middleware");
const {
	createUser,
	getUserProfile,
	updateUser,
} = require("../queries/users.queries");

users.get("/profile", verifyToken, async (req, res) => {
	const uid = req.user.uid;

	try {
		const user = await getUserProfile(uid);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		
		res.status(200).json(user);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error getting user", error: error.message });
	}
});

users.post("/", verifyToken, async (req, res) => {
	const uid = req.user.uid;
	try {
		const user = await createUser({ uid, ...req.body });
		res.status(201).json(user);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error creating user", error: error.message });
	}
});

users.put("/:id", verifyToken, async (req, res) => {
	const uid = req.user.uid;
	try {
		const user = await updateUser(uid, req.body);
		if (!user) {
			return res.status(404).json({ message: "User not found", error });
		}
		res.status(200).json(user);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error updating user", error: error.message });
	}
});

module.exports = users;

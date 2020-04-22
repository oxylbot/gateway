const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
	const db = req.app.locals.db;

	const userLogOptions = await db.settings.userlog.get(req.params.guildId);
	res.status(200).json(userLogOptions);
});

router.put("/", async (req, res) => {
	const db = req.app.locals.db;

	const userLogOptions = await db.settings.userlog.update(req.params.guildId, req.body);
	res.status(200).json(userLogOptions);
});

module.exports = () => router;

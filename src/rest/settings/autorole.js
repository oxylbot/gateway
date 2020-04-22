const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
	const db = req.app.locals.db;

	const roles = await db.settings.autorole.get(req.params.guildId);
	res.status(200).json(roles);
});

router.put("/", async (req, res) => {
	const db = req.app.locals.db;

	const roles = await db.settings.autorole.update(req.params.guildId, req.body.roles);
	res.status(200).json(roles);
});

module.exports = () => router;

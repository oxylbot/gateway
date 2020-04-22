const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
	const db = req.app.locals.db;

	const suggestionSettings = await db.settings.suggestions.get(req.params.guildId);
	res.status(200).json(suggestionSettings);
});

router.put("/", async (req, res) => {
	const db = req.app.locals.db;

	const suggestionSettings = await db.settings.suggestions.update(req.params.guildId, req.body);
	res.status(200).json(suggestionSettings);
});

module.exports = () => router;

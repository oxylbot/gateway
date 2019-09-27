const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
	const db = req.app.locals.db;

	const musicSettings = await db.settings.music.get(req.params.guildId);
	res.status(200).json(musicSettings);
});

router.put("/", async (req, res) => {
	const db = req.app.locals.db;

	const musicSettings = await db.settings.music.update(req.params.guildId, req.body);
	res.status(200).json(musicSettings);
});

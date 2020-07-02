const express = require("express");
const router = express.Router({ mergeParams: true }));

router.get("/", async (req, res) => {
	const db = req.app.locals.db;

	const channelOptions = await db.settings.channels.get(req.params.guildId);
	res.status(200).json(channelOptions);
});

router.put("/", async (req, res) => {
	const db = req.app.locals.db;

	const channelOptions = await db.settings.channels.update(req.params.guildId, req.body);
	res.status(200).json(channelOptions);
});

module.exports = () => router;

const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
	const db = req.app.locals.db;

	const modlogOptions = await db.settings.modlog.get(req.params.guildId);
	res.status(200).json(modlogOptions);
});

router.put("/", async (req, res) => {
	const db = req.app.locals.db;

	const modlogOptions = await db.settings.modlog.update(req.params.guildId, req.body);
	res.status(200).json(modlogOptions);
});

module.exports = () => router;

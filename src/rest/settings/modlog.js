const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
	const db = req.app.locals.db;

	const modlogOptions = await db.settings.modlog.get(req.params.guildId);
	res.status(200).json(modlogOptions);
});

router.patch("/", async (req, res) => {
	const db = req.app.locals.db;

	const modlogOptions = await db.settings.modlog.update(req.params.guildId, req.body);
	res.status(200).json(modlogOptions);
});

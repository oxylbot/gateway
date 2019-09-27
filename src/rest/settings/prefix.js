const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
	const db = req.app.locals.db;

	const prefixOptions = await db.settings.prefix.get(req.params.guildId);
	res.status(200).json(prefixOptions);
});

router.put("/", async (req, res) => {
	const db = req.app.locals.db;

	const prefixOptions = await db.settings.prefix.update(req.params.guildId, req.body);
	res.status(200).json(prefixOptions);
});

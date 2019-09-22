const express = require("express");
const router = express.Router();

const censors = require("./censors");

router.use("/:guildId(\d)/censors", censors());

router.get("/:id(\d)", async (req, res) => {
	const db = req.locals.db;

	const guild = await db.discord.guilds.getById(req.params.id);
	if(!guild) return res.status(404).json({ error: "Guild not found" });

	guild.settings = {};

	return res.status(200).json({ guild });
});

module.exports = () => router;

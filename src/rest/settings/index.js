const express = require("express");
const router = express.Router();

const autorole = require("./autorole");
const autorolebot = require("./autorolebot");
const censors = require("./censors");
const channels = require("./channels");
const modlog = require("./modlog");
const music = require("./music");
const permissions = require("./permissions");
const prefix = require("./prefix");
const reddit = require("./reddit");
const roleme = require("./roleme");
const suggestions = require("./suggestions");
const twitch = require("./twitch");

router.use("/:guildId(\\d+)/autorole", autorole());
router.use("/:guildId(\\d+)/autorole/bots", autorolebot());
router.use("/:guildId(\\d+)/censors", censors());
router.use("/:guildId(\\d+)/channels", channels());
router.use("/:guildId(\\d+)/mod-log", modlog());
router.use("/:guildId(\\d+)/music", music());
router.use("/:guildId(\\d+)/permissions", permissions());
router.use("/:guildId(\\d+)/prefix", prefix());
router.use("/:guildId(\\d+)/reddit", reddit());
router.use("/:guildId(\\d+)/roleme", roleme());
router.use("/:guildId(\\d+)/suggestions", suggestions());
router.use("/:guildId(\\d+)/twitch", twitch());

router.get("/:id(\\d+)", async (req, res) => {
	const db = req.app.locals.db;

	let guild;
	try {
		guild = await req.app.locals.bucket.request("getGuild", {
			guildId: req.params.id
		});
	} catch(err) {
		return res.status(404).json({ error: "Guild not found" });
	}

	const settingQueries = {
		autorole: db.settings.autorole.get(req.params.id),
		autorolebot: db.settings.autorolebot.get(req.params.id),
		censors: db.settings.censors.getByGuildId(req.params.id),
		channels: db.settings.channels.get(req.params.id),
		modlog: db.settings.modlog.get(req.params.id),
		music: db.settings.music.get(req.params.id),
		permissions: db.settings.permissions.getByGuildId(req.params.id),
		prefix: db.settings.prefix.get(req.params.id),
		reddit: db.settings.reddit.getByGuildId(req.params.id),
		roleme: db.settings.roleme.get(req.params.id),
		twitch: db.settings.twitch.getByGuildId(req.params.id)
	};

	guild.settings = await Promise.all(Object.values(settingQueries)).reduce((settings, value, i) => {
		settings[Object.keys(settingQueries)[i]] = value;

		return settings;
	}, {});

	return res.status(200).json({ guild });
});

module.exports = () => router;

const express = require("express");
const router = express.Router({ mergeParams: true }));

router.get("/", async (req, res) => {
	const db = req.app.locals.db;

	const feeds = await db.settings.reddit.getByGuildId(req.params.guildId);
	res.status(200).json(feeds);
});

router.post("/", async (req, res) => {
	const db = req.app.locals.db;

	req.body.guildId = req.params.guildId;
	const feed = await db.settings.reddit.create(req.body);

	res.status(200).json(feed);
});

router.get("/:id", async (req, res) => {
	const db = req.app.locals.db;

	const feed = await db.settings.reddit.getById(req.params.id);

	if(feed) res.status(200).json(feed);
	else res.status(404).json({ error: "Reddit feed not found" });
});

router.patch("/:id", async (req, res) => {
	const db = req.app.locals.db;

	const feed = await db.settings.reddit.update(req.params.id, req.body);

	if(feed) res.status(200).json(feed);
	else res.status(404).json({ error: "Reddit feed not found" });
});

router.delete("/:id", async (req, res) => {
	const db = req.app.locals.db;

	const feed = await db.settings.reddit.delete(req.params.id);

	if(feed) res.status(204).end();
	else res.status(404).json({ error: "Reddit feed not found" });
});

module.exports = () => router;

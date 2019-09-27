const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
	const db = req.app.locals.db;

	const censors = await db.settings.censors.getByGuildId(req.params.guildId);
	res.status(200).json(censors);
});

router.post("/", async (req, res) => {
	const db = req.app.locals.db;

	req.body.guildId = req.params.guildId;
	const censor = await db.settings.censors.create(req.body);

	res.status(200).json(censor);
});

router.get("/:id", async (req, res) => {
	const db = req.app.locals.db;

	const censor = await db.settings.censors.getById(req.params.id);

	if(censor) res.status(200).json(censor);
	else res.status(404).json({ error: "Censor not found" });
});

router.patch("/:id", async (req, res) => {
	const db = req.app.locals.db;

	const censor = await db.settings.censors.update(req.params.id, req.body);

	if(censor) res.status(200).json(censor);
	else res.status(404).json({ error: "Censor not found" });
});

router.delete("/:id", async (req, res) => {
	const db = req.app.locals.db;

	const censor = await db.settings.censors.delete(req.params.id);

	if(censor) res.status(204).end();
	else res.status(404).json({ error: "Censor not found" });
});

module.exports = () => router;

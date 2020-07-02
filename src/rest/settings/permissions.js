const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
	const db = req.app.locals.db;

	const permissions = await db.settings.permissions.getByGuildId(req.params.guildId);
	res.status(200).json(permissions);
});

router.post("/", async (req, res) => {
	const db = req.app.locals.db;

	req.body.guildId = req.params.guildId;
	const permission = await db.settings.permissions.create(req.body);

	res.status(200).json(permission);
});

router.get("/:id", async (req, res) => {
	const db = req.app.locals.db;

	const permission = await db.settings.permissions.getByRoleId(req.params.id);

	if(permission) res.status(200).json(permission);
	else res.status(404).json({ error: "Permission not found" });
});

router.put("/:id", async (req, res) => {
	const db = req.app.locals.db;

	const permission = await db.settings.permissions.update(req.params.id, req.body);

	if(permission) res.status(200).json(permission);
	else res.status(404).json({ error: "Permission not found" });
});

router.delete("/:id", async (req, res) => {
	const db = req.app.locals.db;

	const permission = await db.settings.permissions.delete(req.params.id);

	if(permission) res.status(204).end();
	else res.status(404).json({ error: "Permisison not found" });
});

module.exports = () => router;

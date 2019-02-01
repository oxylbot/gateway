const router = module.exports = new (require("express").Router)();

router.get("/:id", async (req, res) => {
	const db = req.app.locals.db;

	const guild = await db.discord.guilds.getById(req.params.id);

	if(guild) res.status(200).json(guild);
	else res.status(404).json({ error: "Guild not found" });
});

router.delete("/:id", async (req, res) => {
	const db = req.app.locals.db;

	await db.discord.guilds.delete(req.params.id);

	res.status(204).end();
});

router.get("/:id/channels", async (req, res) => {
	const db = req.app.locals.db;

	const channels = await db.discord.channels.getByGuildId(req.params.id);

	res.status(200).json(channels);
});

router.get("/:id/channels/:channelId", async (req, res) => {
	const db = req.app.locals.db;

	const channel = await db.discord.channels.getById(req.params.channelId);

	if(channel) res.status(200).json(channel);
	else res.status(404).json({ error: "Chnnel not found" });
});

router.delete("/:id/channels/:channelId", async (req, res) => {
	const db = req.app.locals.db;

	await db.discord.channels.delete(req.params.channelId);

	res.status(204).end();
});

router.get("/:id/members/:userId", async (req, res) => {
	const db = req.app.locals.db;

	const member = await db.discord.members.getByGuildAndUserId(req.params.id, req.params.userId);

	if(member) res.status(200).json(member);
	else res.status(404).json({ error: "Member not found" });
});

router.delete("/:id/members/:userId", async (req, res) => {
	const db = req.app.locals.db;

	await db.discord.members.delete(req.params.id, req.params.userId);

	res.status(204).end();
});

router.get("/:id/roles", async (req, res) => {
	const db = req.app.locals.db;

	const roles = await db.discord.roles.getByGuildId(req.params.id);

	res.status(200).json(roles);
});

router.get("/:id/roles/:roleId", async (req, res) => {
	const db = req.app.locals.db;

	const role = await db.discord.roles.getById(req.params.roleId);

	if(role) res.status(200).json(role);
	else res.status(404).json({ error: "Role not found" });
});

router.delete("/:id/roles/:roleId", async (req, res) => {
	const db = req.app.locals.db;

	await db.discord.roles.delete(req.params.roleId);

	res.status(204).end();
});

router.get("/:id/voicestates/:userId", async (req, res) => {
	const db = req.app.locals.db;

	const voiceState = await db.discord.voiceStates.getByGuildAndUserId(req.params.id, req.params.userId);

	if(voiceState) res.status(200).json(voiceState);
	else res.status(404).json({ error: "Voice state not found" });
});

router.get("/:id/channels/:channelId/members", async (req, res) => {
	const db = req.app.locals.db;

	const voiceStates = await db.voiceStates.getByChannelId(req.params.channelId);

	res.status(200).json(voiceStates);
});

router.delete("/:id/voicestates/:userId", async (req, res) => {
	const db = req.app.locals.db;

	await db.voiceStates.delete(req.params.id, req.params.userId);

	res.status(204).end();
});

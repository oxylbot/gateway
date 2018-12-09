const router = module.exports = new (require("express").Router)();

router.get("/:id", async (req, res) => {
	const db = req.app.locals.db;

	const guild = await db.discord.guilds.getByID(req.params.id);

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

	const channels = await db.discord.channels.getByGuildID(req.params.id);

	res.status(200).json(channels);
});

router.get("/:id/channels/:channelID", async (req, res) => {
	const db = req.app.locals.db;

	const channel = await db.discord.channels.getByID(req.params.channelID);

	if(channel) res.status(200).json(channel);
	else res.status(404).json({ error: "Chnnel not found" });
});

router.delete("/:id/channels/:channelID", async (req, res) => {
	const db = req.app.locals.db;

	await db.discord.channels.delete(req.params.channelID);

	res.status(204).end();
});

router.get("/:id/members/:userID", async (req, res) => {
	const db = req.app.locals.db;

	const member = await db.discord.members.getByGuildAndUserID(req.params.id, req.params.userID);

	if(member) res.status(200).json(member);
	else res.status(404).json({ error: "Member not found" });
});

router.delete("/:id/members/:userID", async (req, res) => {
	const db = req.app.locals.db;

	await db.discord.members.delete(req.params.id, req.params.userID);

	res.status(204).end();
});

router.get("/:id/roles", async (req, res) => {
	const db = req.app.locals.db;

	const roles = await db.discord.roles.getByGuildID(req.params.id);

	res.status(200).json(roles);
});

router.get("/:id/roles/:roleID", async (req, res) => {
	const db = req.app.locals.db;

	const role = await db.discord.roles.getByID(req.params.roleID);

	if(role) res.status(200).json(role);
	else res.status(404).json({ error: "Role not found" });
});

router.delete("/:id/roles/:roleID", async (req, res) => {
	const db = req.app.locals.db;

	await db.discord.roles.delete(req.params.roleID);

	res.status(204).end();
});

router.get("/:id/voicestates/:userID", async (req, res) => {
	const db = req.app.locals.db;

	const voiceState = await db.discord.voiceStates.getByGuildAndUserID(req.params.id, req.params.userID);

	if(voiceState) res.status(200).json(voiceState);
	else res.status(404).json({ error: "Voice state not found" });
});

router.get("/:id/channels/:channelID/members", async (req, res) => {
	const db = req.app.locals.db;

	const voiceStates = await db.voiceStates.getByChannelID(req.params.channelID);

	res.status(200).json(voiceStates);
});

router.delete("/:id/voicestates/:userID", async (req, res) => {
	const db = req.app.locals.db;

	await db.voiceStates.delete(req.params.id, req.params.userID);

	res.status(204).end();
});

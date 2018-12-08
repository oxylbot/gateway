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
	// await r.table("members")
	// 	.getAll(req.params.id, { index: "guildID" })
	// 	.delete()
	// 	.run();

	// await r.table("channels")
	// 	.getAll(req.params.id, { index: "guildID" })
	// 	.delete()
	// 	.run();

	// await r.table("voiceStates")
	// 	.getAll(req.params.id, { index: "guildID" })
	// 	.delete()
	// 	.run();

	// await r.table("roles")
	// 	.getAll(req.params.id, { index: "guildID" })
	// 	.delete()
	// 	.run();

	res.status(204).end();
});

router.get("/:id/channels", async (req, res) => {
	const db = req.app.locals.db;

	const channels = await db.discord.channels.getByGuildID(req.params.id);
	// const channels = await r.table("channels")
	// 	.getAll(req.params.id, { index: "guildID" })
	// 	.run();

	res.status(200).json(channels);
});

router.get("/:id/channels/:channelID", async (req, res) => {
	const db = req.app.locals.db;

	const channel = await db.discord.channels.getByID(req.params.channelID);
	// const channel = await r.table("channels")
	// 	.get(req.params.channelID)
	// 	.run();

	if(channel) res.status(200).json(channel);
	else res.status(404).json({ error: "Chnnel not found" });
});

router.delete("/:id/channels/:channelID", async (req, res) => {
	const db = req.app.locals.db;

	await db.discord.channels.delete(req.params.channelID);
	// const { deleted } = await r.table("channels")
	// 	.get(req.params.channelID)
	// 	.delete()
	// 	.run();

	res.status(204).end();
});

router.get("/:id/members/:memberID", async (req, res) => {
	const db = req.app.locals.db;

	// const member = await r.table("members")
	// 	.get([req.params.id, req.params.memberID])
	// 	.run();

	const member = await db.discord.members.getByGuildAndUserID(req.params.id, req.params.memberID);

	if(member) {
		res.status(200).json(member);
	} else {
		res.status(404).json({ error: "Member not found" });
	}
});

router.delete("/:id/members/:memberID", async (req, res) => {
	const db = req.app.locals.db;

	await db.discord.members.delete(req.params.id, req.params.memberID);
	// const { deleted } = await r.table("members")
	// 	.get([req.params.id, req.params.memberID])
	// 	.delete()
	// 	.run();

	res.status(204).end();
});

router.get("/:id/roles", async (req, res) => {
	const db = req.app.locals.db;

	const roles = await db.discord.roles.getByGuildID(req.params.id);
	// const roles = await r.table("roles")
	// 	.getAll(req.params.id, { index: "guildID" })
	// 	.run();

	res.status(200).json(roles);
});

router.get("/:id/roles/:roleID", async (req, res) => {
	const db = req.app.locals.db;

	const role = await db.discord.roles.getByID(req.params.roleID);

	// const role = await r.table("roles")
	// 	.get(req.params.roleID)
	// 	.run();

	if(role) res.status(200).json(role);
	else res.status(404).json({ error: "Role not found" });
});

router.delete("/:id/roles/:roleID", async (req, res) => {
	const db = req.app.locals.db;

	await db.discord.roles.delete(req.params.roleID);
	// const { deleted } = await r.table("roles")
	// 	.get(req.params.roleID)
	// 	.delete()
	// 	.run();

	res.status(204).end();
});

router.get("/:id/voicestates/:userID", async (req, res) => {
	const db = req.app.locals.db;

	const voiceState = await db.discord.voiceStates.getByGuildAndUserID(req.params.id, req.params.userID);
	// const voiceState = await r.table("voiceStates")
	// 	.get([req.params.id, req.params.userID])
	// 	.run();

	if(voiceState) res.status(200).json(voiceState);
	else res.status(404).json({ error: "Voice state not found" });
});

router.get("/:id/channels/:channelID/members", async (req, res) => {
	const db = req.app.locals.db;

	const voiceStates = await db.voiceStates.getByChannelID(req.params.channelID);
	// const voiceStates = await r.table("voiceStates")
	// 	.getAll(req.params.channelID, { index: "channelID" })
	// 	.run();

	res.status(200).json(voiceStates);
});

router.delete("/:id/voicestates/:userID", async (req, res) => {
	const db = req.app.locals.db;

	await db.voiceStates.delete(req.params.id, req.params.userID);
	// const { deleted } = await r.table("voiceStates")
	// 	.get([req.params.id, req.params.userID])
	// 	.delete()
	// 	.run();

	res.status(204).end();
});

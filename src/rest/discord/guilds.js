const router = module.exports = new (require("express").Router)();

router.get("/:id", async (req, res) => {
	const r = req.app.locals.r;

	const guild = await r.table("guilds")
		.getAll(req.params.roleID)
		.run();

	if(guild) res.status(200).json(guild);
	else res.status(404).json({ error: "Guild not found" });
});

router.delete("/:id", async (req, res) => {
	const r = req.app.locals.r;

	const { deleted } = await r.table("guilds").get(req.params.id).delete().run();
	if(deleted) {
		await r.table("members")
			.getAll(req.params.id, { index: "guildID" })
			.delete()
			.run();

		await r.table("channels")
			.getAll(req.params.id, { index: "guildID" })
			.delete()
			.run();

		await r.table("voiceStates")
			.getAll(req.params.id, { index: "guildID" })
			.delete()
			.run();

		await r.table("roles")
			.getAll(req.params.id, { index: "guildID" })
			.delete()
			.run();

		res.status(204).end();
	} else {
		res.status(404).json({ error: "Guild is not cached" });
	}
});

router.get("/:id/channels", async (req, res) => {
	const r = req.app.locals.r;

	const channels = await r.table("channels")
		.getAll(req.params.id, { index: "guildID" })
		.run();

	res.status(200).json(channels);
});

router.get("/:id/channels/:channelID", async (req, res) => {
	const r = req.app.locals.r;

	const channel = await r.table("channels")
		.getAll(req.params.channelID)
		.run();

	if(channel) res.status(200).json(channel);
	else res.status(404).json({ error: "Chnnel not found" });
});

router.delete("/:id/channels/:channelID", async (req, res) => {
	const r = req.app.locals.r;

	const { deleted } = await r.table("channels")
		.get(req.params.channelID)
		.delete()
		.run();

	if(deleted) res.status(204).end();
	else res.status(404).json({ error: "Channel is not cached" });
});

router.get("/:id/members/:memberID", async (req, res) => {
	const r = req.app.locals.r;

	const member = await r.table("members")
		.get([req.params.id, req.params.memberID])
		.run();

	if(member) {
		member.id = member.id[1];

		res.status(200).json(member);
	} else {
		res.status(404).json({ error: "Member not found" });
	}
});

router.delete("/:id/members/:memberID", async (req, res) => {
	const r = req.app.locals.r;

	const { deleted } = await r.table("members")
		.get([req.params.id, req.params.memberID])
		.delete()
		.run();

	if(deleted) res.status(204).end();
	else res.status(404).json({ error: "Member is not cached" });
});

router.get("/:id/roles", async (req, res) => {
	const r = req.app.locals.r;

	const roles = await r.table("roles")
		.getAll(req.params.id, { index: "guildID" })
		.run();

	res.status(200).json(roles);
});

router.get("/:id/roles/:roleID", async (req, res) => {
	const r = req.app.locals.r;

	const role = await r.table("roles")
		.getAll(req.params.roleID)
		.run();

	if(role) res.status(200).json(role);
	else res.status(404).json({ error: "Role not found" });
});

router.delete("/:id/roles/:roleID", async (req, res) => {
	const r = req.app.locals.r;

	const { deleted } = await r.table("roles")
		.get(req.params.roleID)
		.delete()
		.run();

	if(deleted) res.status(204).end();
	else res.status(404).json({ error: "Role is not cached" });
});

// TODO: voice states

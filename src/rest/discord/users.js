const router = module.exports = new (require("express").Router)();

router.get("/", async (req, res) => {
	const db = req.app.locals.db;

	if(req.query.name && req.query.discriminator) {
		const users = await db.discord.users.getByNameAndDiscrim(req.query.name, req.query.discriminator);

		res.status(200).json(users);
	} else if(req.query.discriminator) {
		const users = await db.discord.users.getByDiscrim(req.query.discriminator);

		res.status(200).json(users);
	} else if(req.query.name) {
		const users = await db.discord.users.getByName(req.query.name);

		res.status(200).json(users);
	} else {
		const userCount = await db.models.User.count();

		res.status(200).json({ userCount });
	}
});

router.get("/:id", async (req, res) => {
	const db = req.app.locals.db;

	const user = await db.discord.users.getById(req.params.id);

	if(user) res.status(200).json(user);
	else res.status(404).json({ error: "User not found" });
});

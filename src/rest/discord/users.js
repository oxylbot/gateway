const router = module.exports = new (require("express").Router)();

router.get("/", async (req, res) => {
	const db = req.app.locals.db;

	const userCount = await db.models.UserModel.count();

	res.status(200).json({ users: userCount });
});

router.get("/:id", async (req, res) => {
	const db = req.app.locals.db;

	const user = await db.discord.users.getById(req.params.id);

	if(user) res.status(200).json(user);
	else res.status(404).json({ error: "User not found" });
});

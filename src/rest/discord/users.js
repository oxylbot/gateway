const router = module.exports = new (require("express").Router)();

router.get("/", async (req, res) => {
	const r = req.app.locals.r;

	const userCount = await r.table("users")
		.count()
		.run();

	res.status(200).json({ users: userCount });
});

router.get("/:id", async (req, res) => {
	const r = req.app.locals.r;

	const user = await r.table("users")
		.get(req.params.id)
		.run();

	if(user) res.status(200).json(user);
	else res.status(404).json({ error: "User not found" });
});

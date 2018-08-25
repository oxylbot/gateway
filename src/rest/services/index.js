const router = module.exports = new (require("express").Router)();

router.get("/", async (req, res) => {
	res.status(200).json({});
});

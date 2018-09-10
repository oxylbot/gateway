const router = module.exports = new (require("express").Router)();

router.use("/guilds", require("./guilds"));
router.use("/users", require("./users"));

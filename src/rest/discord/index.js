const express = require("express");
const router = express.Router();

const guilds = require("./guilds");
const users = require("./users");

router.use("/guilds", guilds());
router.use("/users", users());

module.exports = () => router;

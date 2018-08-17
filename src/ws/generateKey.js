const crypto = require("crypto");

module.exports = async redis => {
	const key = crypto.randomBytes(24).toString("hex");

	redis.set(`api:keys:${key}`, "", "EX", 1800);
};

const crypto = require("crypto");

module.exports = async ws => {
	const key = crypto.randomBytes(24).toString("hex");

	ws.locals.server.set(`api:keys:${key}`, ws.locals.id);
};

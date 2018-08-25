const config = require("../../../config");

module.exports = () => (req, res, next) => {
	if(!req.headers.authorization) {
		res.status(401).json({ error: "No secret given" });

		return false;
	} else if(req.headers.authorization !== config.secret) {
		res.status(403).json({ error: "Invalid secret" });

		return false;
	} else {
		return next();
	}
};

module.exports = () => (req, res, next) => {
	if(!req.get("Authorization")) {
		res.status(401).json({ error: "No secret given" });

		return false;
	} else if(req.get("Authorization") !== "") {
		// TODO: get a secret to use as an auth header from k8s
		res.status(403).json({ error: "Invalid secret" });

		return false;
	} else {
		return next();
	}
};

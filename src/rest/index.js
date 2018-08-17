const express = require("express");

const app = express();

app.disable("etag");
app.disable("x-powered-by");
app.set("env", process.env.NODE_ENV);

module.exports = async (r, redis) => {
	app.locals.r = r;
	app.locals.redis = redis;
};

app.listen(3821);

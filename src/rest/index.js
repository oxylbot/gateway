const express = require("express");

const app = express();

app.disable("etag");
app.disable("x-powered-by");
app.set("env", process.env.NODE_ENV);

module.exports = async r => {
	app.locals.r = r;
};

app.listen(3821);

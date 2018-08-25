const express = require("express");

const app = express();

app.disable("etag");
app.disable("x-powered-by");
app.set("env", process.env.NODE_ENV);

const authorization = require("./middleware/authorization");
app.use(authorization());

const services = require("./services/index");
app.use("/services", services);

module.exports = async r => {
	app.locals.r = r;
};

app.all("*", (req, res) => {
	res.status("404").json({ error: "Method not found" });
});
app.listen(3821);

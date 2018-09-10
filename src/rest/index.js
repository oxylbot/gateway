const express = require("express");

const app = express();

app.enable("trust proxy");
app.disable("etag");
app.disable("x-powered-by");
app.set("env", process.env.NODE_ENV);

const authorization = require("./middleware/authorization");
app.use(authorization());

app.use("/discord", require("./discord/index"));
app.use("/services", require("./services/index"));

module.exports = async r => {
	app.locals.r = r;
};

app.all("*", (req, res) => {
	res.status("404").json({ error: "Method not found" });
});
app.listen(3821);

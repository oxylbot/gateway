const express = require("express");
const discord = require("./discord/index");
const settings = require("./settings/index");

const app = express();

app.enable("trust proxy");
app.disable("etag");
app.disable("x-powered-by");
app.set("env", process.env.NODE_ENV);


app.use(express.json());
app.use("/discord", discord());
app.use("/settings", settings());

module.exports = async db => {
	app.locals.db = db;
};

app.all("*", (req, res) => {
	res.status("404").json({ error: "404: Method not found" });
});

app.listen(process.env.GATEWAY_SERVICE_PORT);

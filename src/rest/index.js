const express = require("express");

const app = express();

app.enable("trust proxy");
app.disable("etag");
app.disable("x-powered-by");
app.set("env", process.env.NODE_ENV);

app.use(express.json());
app.use("/discord", require("./discord/index"));


module.exports = async db => {
	app.locals.db = db;
};

app.all("*", (req, res) => {
	res.status("404").json({ error: "Method not found" });
});

app.listen(3821);

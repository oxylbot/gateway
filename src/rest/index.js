const express = require("express");
const expressWinston = require("express-winston");
const logger = require("../logger");
const settings = require("./settings/index");

const app = express();

app.enable("trust proxy");
app.disable("etag");
app.disable("x-powered-by");
app.set("env", process.env.NODE_ENV);

app.use(express.json());

app.use(expressWinston.logger({ winstonInstance: logger }));
app.use("/settings", settings());
app.use(expressWinston.errorLogger({ winstonInstance: logger }));

module.exports = async db => {
	app.locals.db = db;
};

app.all("*", (req, res) => {
	res.status("404").json({ error: "404: Method not found" });
});

app.listen(process.env.GATEWAY_SERVICE_PORT, () => {
	logger.info(`REST API listening on port ${process.env.GATEWAY_SERVICE_PORT}`);
});

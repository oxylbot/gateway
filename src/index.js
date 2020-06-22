const database = require("./database/index");
const logger = require("./logger");
const rest = require("./rest/index");

async function init() {
	const db = await database();
	logger.info("Database initiated");

	await rest(db);
}

init();

process.on("unhandledRejection", error => {
	logger.error(error.stack, { error });
	process.exit(1);
});

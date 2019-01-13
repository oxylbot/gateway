const database = require("./database/index");
const rest = require("./rest/index");

require("dotenv").load();

async function init() {
	const db = await database();

	await rest(db);
}

init();

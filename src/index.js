const database = require("./database/index");
const rest = require("./rest/index");

async function init() {
	const db = await database();

	await rest(db);
}

init();

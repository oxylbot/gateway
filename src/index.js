const config = require("../config.json");
const rethinkdb = require("./rethinkdb");

const rest = require("./rest/index");
const ws = require("./ws/index");

async function init() {
	const r = rethinkdb(config.rethinkdb);

	await ws(r);
	await rest(r);
}

init();

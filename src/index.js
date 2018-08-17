const config = require("../config.json");
const Redis = require("ioredis");
const rethinkdb = require("./rethinkdb");

const rest = require("./rest/index");
const ws = require("./ws/index");

async function init() {
	const r = rethinkdb(config.rethinkdb);
	const redis = new Redis();

	await ws(r, redis);
	await rest(r, redis);
}

init();

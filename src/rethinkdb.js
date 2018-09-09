const config = require("../config");
const rethinkdbdash = require("rethinkdbdash");

const tables = [{
	name: "members",
	primaryKey: "id",
	indexes: ["guildID", {
		name: "getByNickname",
		rows: ["guildID", "nickname"]
	}]
}, {
	name: "roles",
	primaryKey: "id",
	indexes: ["guildID", {
		name: "getByName",
		rows: ["guildID", "name"]
	}]
}, {
	name: "users",
	primaryKey: "id",
	indexes: ["username", {
		name: "tag",
		rows: ["username", "discriminator"]
	}]
}, {
	name: "guilds",
	primaryKey: "id"
}, {
	name: "channels",
	primaryKey: "id",
	indexes: ["guildID", {
		name: "getByName",
		rows: ["guildID", "name"]
	}, {
		name: "getByType",
		rows: ["guildID", "type"]
	}]
}, {
	name: "voiceStates",
	primaryKey: "id", // ["guildID", "userID"]
	indexes: ["guildID", "channelID"]
}];

module.exports = async () => {
	const r = rethinkdbdash({
		db: config.rethinkdb.db,
		password: config.rethinkdb.password,
		silent: true,
		servers: [{
			host: config.rethinkdb.host,
			port: config.rethinkdb.port
		}]
	});

	const dbList = await r.dbList().run();
	if(!dbList.includes(config.rethinkdb.db)) await r.dbCreate(config.rethinkdb.db).run();

	const tableList = await r.tableList().run();
	for(const table of tables) {
		if(!tableList.includes(table.name)) await r.tableCreate(table.name, { primaryKey: table.primaryKey }).run();

		const indexList = await r.table(table.name).indexList().run();
		for(const index of table.indexes || []) {
			if(Array.isArray(index)) {
				if(indexList.includes(index.name)) continue;
				else await r.table(table.name).indexCreate(index.name, index.rows.map(row => r.row(row)));
			} else if(indexList.includes(index)) {
				continue;
			} else {
				await r.table(table.name).indexCreate(index).run();
			}
		}

		await r.table(table.name).indexWait().run();
	}

	return r;
};

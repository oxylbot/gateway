const Database = require("./db");

const database = new Database();

module.exports = async () => {
	await database.init({
		password: process.env.PG_PASSWORD,
		database: process.env.PG_DATABASE,
		user: process.env.PG_USER,
		host: process.env.PG_HOST,
		port: process.env.PG_PORT
	});

	return {
		discord: await require("./discord/index")(database.models)
	};
};

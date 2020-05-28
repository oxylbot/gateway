const Database = require("./db");

const database = new Database();

module.exports = async () => {
	await database.init({
		password: process.env.PG_PASSWORD,
		database: process.env.PG_DATABASE,
		user: process.env.PG_USER,
		host: "postgres",
		port: process.env.POSTGRES_SERVICE_PORT
	});

	return {
		settings: require("./settings/index")(database.models.settings)
	};
};

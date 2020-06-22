const logger = require("../logger");
const models = require("./models/index");
const Sequelize = require("sequelize");

class Database {
	constructor() {
		this.sequelize = {};
		this.models = {};
	}

	async init({ password, user, database, host, port }) {
		logger.info("Initiating database");
		this.sequelize = new Sequelize(database, user, password, {
			dialect: "postgres",
			host: host,
			port: port,
			logger: msg => logger.verbose(msg)
		});

		await this.sequelize.authenticate();
		this.models = models(this.sequelize);

		await this.sequelize.sync();
		logger.info("Database authenticated & synced");
	}
}

module.exports = Database;

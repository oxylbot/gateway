const Sequelize = require("sequelize");
const models = require("./models");

class Database {
	constructor() {
		this.sequelize = {};
		this.models = {};
	}

	async init({ password, user, database, host, port }) {
		this.sequelize = new Sequelize(database, user, password, {
			dialect: "postgres",
			operatorsAliases: false,
			host: host,
			port: port
		});

		await this.sequelize.authenticate();
		this.models = models(this.sequelize);

		await this.sequelize.sync();
	}
}

module.exports = Database;

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

		await this.sequelize.actions.authenticate();
		await this.sequelize.actions.sync();
		this.models = models(this.sequelize);
	}
}

module.exports = Database;

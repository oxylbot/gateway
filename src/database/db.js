const Sequelize = require("sequelize");
const models = require("./models");

module.exports = class Database {
	constructor() {
		this.sequelize = {};
		this.models = {};
	}

	async init({ password, user, database, host, port }) {
		this.sequelize = {
			main: Sequelize,
			actions: new Sequelize(database, user, password, {
				dialect: "postgres",
				operatorsAliases: false,
				host: host,
				port: port
			})
		};

		await this.sequelize.actions.authenticate();
		await this.sequelize.actions.sync();
		this.models = models(this.sequelize);
	}
};

const Sequelize = require("sequelize");
const models = require("./models");

module.exports = class Database {
	constructor() {
		this.sequelize = {};
		this.models = {};
	}

	async init() {
		const {
			PG_PASSWORD,
			PG_DATABASE,
			PG_USER,
			PG_HOST,
			PG_PORT
		} = process.env;

		this.sequelize = {
			main: Sequelize,
			actions: new Sequelize(PG_DATABASE, PG_USER, PG_PASSWORD, {
				dialect: "postgres",
				operatorsAliases: false,
				host: PG_HOST,
				port: PG_PORT
			})
		};

		await this.sequelize.actions.authenticate();
		await this.sequelize.actions.sync();
		this.models = models(this.sequelize);
	}
};

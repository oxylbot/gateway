const { readFile } = require("fs/promises");

module.exports = class Database {
	constructor() {
		this.sequelize = {};
	}

	async initDb() {
		const PG_PASSWORD = await readFile("/etc/secrets/pg-password.txt");

		const Sequelize = require("sequelize");

		this.sequelize = {
			main: Sequelize,
			actions: new Sequelize("oxyl-db", "oxyl", PG_PASSWORD, {
				dialect: "postgres",
				operatorsAliases: false,
				logging: true
			})
		};

		this.sequelize.actions
			.authenticate()
			.then(() => console.log("Connection has been established successfully"))
			.catch(err => console.log("Unable to connect to database : ", err));
	}
};

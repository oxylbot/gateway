const Sequelize = require("sequelize");

module.exports = class Database {
	constructor() {
		this.sequelize = {};
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

		this.sequelize.actions.sync()
			.then(() => console.log("Created Tables"))
			.catch(err => console.log("Failed to create Db :", err));

		this.sequelize.actions
			.authenticate()
			.then(() => console.log("Connection has been established successfully"))
			.catch(err => console.log("Unable to connect to database : ", err));
	}
};

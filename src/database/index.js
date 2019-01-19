const Database = require("./db");

const database = new Database();

module.exports = async () => {
	await database.init();

	return {
		discord: await require("./discord/index")(database.sequelize)
	};
};

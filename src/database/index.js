const cassandra = require("cassandra-driver");
const client = new cassandra.Client({});

module.exports = async () => {
	await client.connect();

	return {
		discord: {
			user: await require("./discord/user/index")(client)
		}
	};
};

const Database = require("./db");

const database = new Database();

module.exports = async () => {
	await database.init();

	return {
		discord: await require("./discord/index")(database.sequelize)
	};
};

// const cassandra = require("cassandra-driver");

// const keyspace = `oxyl_${process.env.NODE_ENV.toLowerCase()}`;
// // TODO: get ip address of db to connect to it from k8s
// const client = new cassandra.Client({
// 	contactPoints: ["get from k8s"],
// 	keyspace
// });

// module.exports = async () => {
// 	await client.connect();

// 	await client.execute(`CREATE KEYSPACE IF NOT EXISTS ${keyspace}` +
// 		"WITH replication = {'class': 'SimpleStrategy' }");
// 	await client.execute(`USE ${keyspace}`);

// 	return {
// 		discord: await require("./discord/index.js")(client)
// 	};
// };

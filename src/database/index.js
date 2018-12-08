const cassandra = require("cassandra-driver");
const client = new cassandra.Client({});

module.exports = async () => {
	await client.connect();

	const keyspace = `oxyl_${process.env.NODE_ENV.toLowerCase()}`;
	await client.execute(`CREATE KEYSPACE IF NOT EXISTS ${keyspace}` +
		"WITH replication = {'class': 'SimpleStrategy' }");
	await client.execute(`USE ${keyspace}`);

	return {
		discord: await require("./discord/index.js")(client)
	};
};

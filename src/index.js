const database = require("./database/index");
const logger = require("./logger");
const path = require("path");
const protobuf = require("protobufjs");
const rest = require("./rest/index");

const BucketClient = require("./sockets/BucketClient");

const bucketClient = new BucketClient();

async function init() {
	const db = await database();
	logger.info("Database initiated");

	const rpcProto = await protobuf.load(path.resolve(__dirname, "..", "bucket-proto", "rpcWrapper.proto"));
	logger.info("Loaded bucket RPC prototype");
	const discordProto = await protobuf.load(path.resolve(__dirname, "..", "bucket-proto", "service.proto"));
	logger.info("Loaded discord bucket prototype");
	bucketClient.start({
		discord: discordProto,
		rpc: rpcProto
	});
	logger.info("Started bucket socket");

	await rest(db, bucketClient);
}

init();

process.on("unhandledRejection", error => {
	logger.error(error.stack, { error });
	process.exit(1);
});

process.on("SIGTERM", () => {
	bucketClient.close();
	logger.info("Socket closed due to SIGTERM");

	process.exit(0);
});

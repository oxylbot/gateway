const path = require("path");
const protobuf = require("protobufjs");

const CacheSocket = require("./CacheSocket");
const socket = new CacheSocket();

module.exports = async database => {
	const cacheProto = await protobuf.load(path.resolve(__dirname, "..", "..", "protobuf", "Cache.proto"));

	socket.start(cacheProto, database);
};

process.on("SIGTERM", () => {
	socket.close();

	process.exit(0);
});

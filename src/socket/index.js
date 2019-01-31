const path = require("path");
const protobuf = require("protobufjs");

const CacheSocket = require("./CacheSocket");
const socket = new CacheSocket(process.env.CACHE_SOCKET_ADDRESS);

async function init(database) {
	const cacheProto = await protobuf.load(path.resolve(__dirname, "..", "..", "protobuf", "Cache.proto"));

	socket.start(cacheProto, database);
}

init();

process.on("SIGTERM", () => {
	socket.close();

	process.exit(0);
});

const handler = require("./request-handler");
const zmq = require("zeromq");

class CacheSocket {
	constructor(address) {
		this.address = address;
		this.socket = zmq.socket("pull");
		this.socket.on("message", this.message.bind(this));

		this.database = null;
		this.proto = null;
	}

	start(proto, database) {
		this.database = database;
		this.proto = proto;

		this.socket.connect(this.address);
	}

	close() {
		this.socket.close();
	}

	async message(message) {
		const request = this.proto.lookup("CacheRequest");
		const decoded = request.decode(message);

		const requestType = this.proto.lookup(decoded.type);
		await handler(this.database, decoded.type, requestType.decode(decoded.data));
	}
}

module.exports = CacheSocket;
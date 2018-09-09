const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3282 });

const constants = require("./constants");
const { promisify } = require("util");
const zlib = require("zlib");
const deflate = promisify(zlib.deflate);

const send = require("./send/index");
const handler = require("./handler/index");
const sharding = require("../sharding");

module.exports = async r => wss.locals = { r };
module.exports.wss = wss;

wss.on("connection", async ws => {
	ws.locals = {
		server: wss,
		identified: false,
		compress: false,
		type: null,
		id: (Date.now() + process.hrtime().reduce((a, b) => a + b)).toString(36)
	};

	ws._send = ws.send;
	ws.send = async data => {
		if(ws.locals.compress) {
			const deflated = await deflate(JSON.stringify(data));
			ws._send(deflated);
		} else {
			ws._send(JSON.stringify(data));
		}
	};

	ws.on("message", message => {
		try {
			message = JSON.parse(message);
		} catch(err) {
			ws.close(constants.CLOSE_CODES.INVALID_JSON, "error parsing json");
		}

		if(message.op === undefined) {
			ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, "invalid payload, no op code provided");
			return;
		} else if(![constants.OPCODES.IDENTIFY, constants.OPCODES.HEARTBEAT].includes(message.op) &&
			!ws.locals.identified) {
			ws.close(constants.CLOSE_CODES.NOT_IDENTIFIED, "cannot send payload, not identified");
			return;
		} else if(message.d === undefined) {
			ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, "invalid payload, no d field provided");
			return;
		}

		switch(message.op) {
			case constants.OPCODES.IDENTIFY: {
				handler.identify(ws, message);

				break;
			}

			case constants.OPCODES.HEARTBEAT: {
				handler.heartbeat(ws, message);

				break;
			}

			case constants.OPCODES.EVENT: {
				handler.event(ws, message);

				break;
			}

			case constants.OPCODES.CACHE: {
				handler.cache(ws, message);

				break;
			}

			default: {
				ws.close(constants.CLOSE_CODES.UNKNOWN_OPCODE, `could not handle opcode sent: ${message.op}`);

				break;
			}
		}
	});

	ws.on("close", (code, reason) => {
		if(ws.locals.heartbeatChecker) clearInterval(ws.local.heartbeatChecker);
		if(ws.locals.shards) sharding.return(ws.locals.shards);
	});

	send.hello(ws);
});

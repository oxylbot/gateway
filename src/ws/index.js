const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3282 });

const constants = require("./constants");
const { promisify } = require("util");
const zlib = require("zlib");
const deflate = promisify(zlib.deflate);

const send = require("./send/index");
const handler = require("./handler/index");
const generateKey = require("./generateKey");

module.exports = async (r, redis) => {
	wss.r = r;
	wss.redis = redis;
};

wss.on("connection", async ws => {
	ws.server = wss;

	ws._send = ws.send;
	ws.send = async data => {
		if(ws.compress) {
			const deflated = await deflate(JSON.stringify(data));
			ws._send(deflated.toString("utf8"));
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
			ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, "invalid payload -- no op code provided");
			return;
		}

		switch(message.op) {
			case constants.OPCODES.IDENTIFY: {
				handler.identify(ws, message);

				break;
			}

			default: {
				ws.close(constants.CLOSE_CODES.UNKNOWN_OPCODE, "could not handle opcode sent");
				break;
			}
		}
	});

	send.hello({ key: await generateKey(wss.redis) });
});

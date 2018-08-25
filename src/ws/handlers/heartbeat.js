const constants = require("../constants");
const send = require("../send/index");

module.exports = async (ws, message) => {
	ws.locals.lastHeartbeat = Date.now();

	if(typeof message.d.heapUsed !== "number") {
		ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, "invalid or no heapUsed given");
	} else if(ws.locals.type === "sharder" && typeof message.d.guilds !== "number") {
		ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, "invalid or no guilds given");
	}

	send.heartbeatAcknowledgement(ws);
};

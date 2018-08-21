const send = require("../send/index");

module.exports = async (ws, message) => {
	ws.locals.lastHeartbeat = Date.now();

	send.heartbeatAcknowledgement(ws);
};

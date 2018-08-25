const constants = require("../constants");

module.exports = (ws) => {
	ws.locals.heartbeatInterval = constants.HEARTBEAT_INTERVAL;
	ws.locals.heartbeatChecker = setInterval(() => {
		if(Date.now() - ws.locals.lastHeartbeat >= ws.locals.heartbeatInterval * 2) {
			ws.close(constants.CLOSE_CODES.NO_HEARTBEAT, "no heartbeat sent");
		}
	}, ws.locals.heartbeatInterval);

	ws.send({
		op: constants.OPCODES.HELLO,
		d: {
			heartbeatInterval: constants.HEARTBEAT_INTERVAL
		}
	});
};

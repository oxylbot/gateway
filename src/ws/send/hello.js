const constants = require("../constants");

module.exports = (ws, { key }) => {
	ws.locals.key = key;
	ws.locals.heartbeatInterval = constants.HEARTBEAT_INTERVAL;

	ws.send({
		op: constants.OPCODES.HELLO,
		d: {
			heartbeatInterval: constants.HEARTBEAT_INTERVAL,
			key
		}
	});
};

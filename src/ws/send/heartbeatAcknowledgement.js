const constants = require("../constants");

module.exports = ws => {
	ws.send({
		op: constants.OPCODES.HEARTBEAT_ACKNOWLEDGEMENT,
		d: {}
	});
};

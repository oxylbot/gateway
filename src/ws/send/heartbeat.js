const constants = require("../constants");

module.exports = ws => {
	ws.send({
		op: constants.OPCODES.HEARTBEAT,
		d: {}
	});
};

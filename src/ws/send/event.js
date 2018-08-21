const constants = require("../constants");

module.exports = (ws, eventName, data) => {
	ws.send({
		op: constants.OPCODES.EVENT,
		d: data,
		t: eventName
	});
};

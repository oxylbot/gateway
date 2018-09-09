const config = require("../../../config");
const constants = require("../constants");
const send = require("../send/index");
const sharding = require("../../sharding");

module.exports = async (ws, message) => {
	if(ws.locals.identified) {
		ws.close(constants.CLOSE_CODES.ALREADY_AUTHENTICATED, "already identified");
		return;
	}

	if(!constants.SERVICE_TYPES.includes(message.d.type)) {
		ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, `invalid microservice type: ${message.d.type}`);
		return;
	} else {
		ws.locals.type = message.d.type;
	}

	if(message.d.compress === false) {
		ws.locals.compress = false;
	} else if(message.d.compress === true) {
		ws.locals.compress = true;
	} else {
		ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, "did not specify whether or not to compress");
		return;
	}

	if(message.d.secret !== config.secret) {
		ws.close(constants.CLOSE_CODES.AUTHENTICATION_FAILED, `wrong secret: ${message.d.secret}`);
	} else {
		ws.locals.identified = true;

		const identified = {};
		if(message.d.type === "sharder") {
			ws.locals.shards = sharding.next();
			identified.shards = ws.locals.shards;
		}

		send.event(ws, "IDENTIFIED", identified);
	}
};

const config = require("../../../config");
const constants = require("../constants");

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

	if(message.d.type === "sharder") {
		if(typeof message.d.extra !== "object") {
			ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, "did not include extra field");
			return;
		} else if(!Array.isArrray(message.d.extra.shards) ||
			!message.d.extra.shards.every(shard => typeof shard === "number" && shard >= 0)) {
			ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, `invalid shards: ${message.d.extra.shards}`);
			return;
		} else if(typeof message.d.extra.maxShards !== "number") {
			ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, `invalid max shards: ${message.d.extra.maxShards}`);
			return;
		} else {
			ws.locals.shards = message.d.extra.shards;
			ws.locals.maxShards = message.d.extra.maxShards;
		}
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
	}
};

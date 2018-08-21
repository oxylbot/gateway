const config = require("../../../config");
const constants = require("../constants");

module.exports = async (ws, message) => {
	if(ws.locals.identified) {
		ws.close(constants.CLOSE_CODES.ALREADY_AUTHENTICATED, "already identified");
		return;
	}

	if(!constants.SERVICE_TYPES.includes(message.t.type)) {
		ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, "invalid microservice type");
		return;
	} else {
		ws.locals.type = message.t.type;
	}

	if(message.t.type === "sharder") {
		if(typeof message.t.extra !== "object") {
			ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, "did not include extra field");
			return;
		} else if(!Array.isArrray(message.t.extra.shards) ||
			!message.t.extra.shards.every(shard => typeof shard === "number" && shard >= 0)) {
			ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, "invalid shards");
			return;
		} else if(typeof message.t.extra.maxShards !== "number") {
			ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, "invalid max shards");
			return;
		} else {
			ws.locals.shards = message.t.extra.shards;
			ws.locals.maxShards = message.t.extra.maxShards;
		}
	}

	if(message.t.compress === false) {
		ws.locals.compress = false;
	} else if(message.t.compress === true) {
		ws.locals.compress = true;
	} else {
		ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, "did not specify whether or not to compress");
		return;
	}

	if(message.t.secret !== config.secret) {
		ws.close(constants.CLOSE_CODES.AUTHENTICATION_FAILED, "wrong secret, cannot connect");
		return;
	} else {
		ws.locals.identified = true;
	}
};

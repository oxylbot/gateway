const constants = require("../constants");
const send = require("../send/index");

module.exports = async (ws, message) => {
	if(!message.t) {
		ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, "no event name given");
		return;
	} else if(!constants.EVENTS[message.t]) {
		ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, `invalid event name: ${message.t}`);
		return;
	}

	const event = constants.EVENTS[message.t];
	if(!event.from.includes(ws.locals.type)) {
		ws.close(constants.CLOSE_CODES.CANT_SEND, `cannot send ${message.t} from service type ${ws.locals.type}`);
		return;
	} else {
		const data = {};

		if(message.t === "EXECUTE_COMMAND") {
			if(typeof message.d.command !== "string") {
				ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, "invalid or no command given");
			} else if(typeof message.d.raw !== "string") {
				ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, "invalid or no raw content given");
			} else if(Array.isArray(message.d.ids) || typeof message.d.ids !== "object") {
				ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, "no ids object given");
			} else if(typeof message.d.ids.message !== "string") {
				ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, "invalid or no message id given");
			} else if(typeof message.d.ids.author !== "string") {
				ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, "invalid or no author id given");
			} else if(typeof message.d.ids.channel !== "string") {
				ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, "invalid or no channel id given");
			} else if(typeof message.d.ids.guild !== "string") {
				ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, "invalid or no guild id given");
			} else if(typeof message.d.ids.shard !== "number") {
				ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, "invalid or no shard id given");
			} else {
				data.command = message.d.command;
				data.raw = message.d.raw;
				data.ids = {
					message: message.d.ids.message,
					author: message.d.ids.author,
					channel: message.d.ids.channel,
					guild: message.d.ids.guild,
					shard: message.d.ids.shard
				};
			}
		}

		ws.locals.server.clients.forEach(client => {
			if(event.to.includes(client.locals.type)) {
				send.event(client, message.t, data);
			}
		});
	}
};

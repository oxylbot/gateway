const logger = require("../../../logger");
module.exports = Channels => async (guildId, options) => {
	options.guildId = guildId;
	logger.debug("Upserting channel", { options });

	return await Channels.upsert(options);
};

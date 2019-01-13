const Models = require("../../models");

module.exports = async database => async guild_id => {
	const { ChannelModel } = Models(database);

	const channels = await ChannelModel.findAll({ where: { guild_id } });

	return channels.length !== 0 ? channels : null;
};

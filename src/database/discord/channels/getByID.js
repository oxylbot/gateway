const Models = require("../models");

module.exports = async database => async id => {
	const { ChannelModel } = Models(database);

	const channels = await ChannelModel.findAll({ where: { id } });

	return channels.length !== 0 ? channels : null;
};

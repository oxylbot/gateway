const Models = require("../../models");

module.exports = async database => async channels => {
	const { ChannelModel } = Models(database);
	const channelObjects = [];

	for(const channel of channels) {
		const channelObject = await ChannelModel.create(channel);
		channelObjects.push(channelObject.get({ plain: true }));
	}

	return channelObjects.length !== 0 ? channelObjects : null;
};

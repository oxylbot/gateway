const Models = require("../models");

module.exports = async database => async id => {
	const { ChannelModel } = Models(database);

	return await ChannelModel.destroy({ where: { id } });
};

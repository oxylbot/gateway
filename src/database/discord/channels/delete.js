const Models = require("../models");

module.exports = async database => async id => {
	const { ChannelModel } = Models(database);

	try {
		// I have no Idea what this returns...
		return await ChannelModel.destroy({ where: { id } });
	} catch (error) {
		console.log(error);
	}
};

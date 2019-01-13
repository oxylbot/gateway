const Models = require("../../models");

module.exports = async database => async channel_id => {
	const { VoiceStateModel } = Models(database);

	const voiceStates = await VoiceStateModel.findAll({ where: { channel_id } });

	return voiceStates.length !== 0 ? voiceStates : null;
};

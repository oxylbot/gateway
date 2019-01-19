const Models = require("../../models");

module.exports = async database => async voiceStates => {
	const { VoiceStateModel } = Models(database);

	return await VoiceStateModel.bulkCreate(voiceStates);
};

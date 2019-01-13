const Models = require("../../models");

module.exports = async database => async (guild_id, user_id) => {
	const { VoiceStateModel } = Models(database);

	const voiceStates = await VoiceStateModel.findAll({
		where: {
			guild_id,
			user_id
		}
	});

	return voiceStates.length !== 0 ? voiceStates : null;
};

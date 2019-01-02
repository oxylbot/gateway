const Models = require("../models");

module.exports = async database => async (guild_id, user_id) => {
	const { VoiceStateModel } = Models(database);


	return await VoiceStateModel.destroy({
		where: {
			guild_id,
			user_id
		}
	});
};

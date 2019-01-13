const Models = require("../../models");

module.exports = async database => async voiceStates => {
	const { VoiceStateModel } = Models(database);
	const voiceStateObjects = [];

	for(const voiceState of voiceStateObjects) {
		try {
			const voiceStateObject = await VoiceStateModel.create(voiceState);
			voiceStateObjects.push(voiceStateObject.get({ plain: true }));
		} catch(error) {
			console.log(error);
		}
	}

	return voiceStateObjects.length !== 0 ? voiceStateObjects : null;
};

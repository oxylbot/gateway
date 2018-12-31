module.exports = database => {
	const VoiceStates = database.actions.define("voicestates", {
		user_id: {
			type: database.main.TEXT,
			primaryKey: true,
			allowNull: false
		},
		guild_id: {
			type: database.main.TEXT,
			primaryKey: true,
			allowNull: false
		},
		channel_id: {
			type: database.main.TEXT,
			allowNull: false
		},
		deaf: {
			type: database.main.BOOLEAN,
			defaultValue: false,
			allowNull: false
		},
		mute: {
			type: database.main.BOOLEAN,
			defaultValue: false,
			allowNull: false
		},
		self_deaf: {
			type: database.main.BOOLEAN,
			defaultValue: false,
			allowNull: false
		},
		self_mute: {
			type: database.main.BOOLEAN,
			defaultValue: false,
			allowNull: false
		}
	});

	return VoiceStates;
};

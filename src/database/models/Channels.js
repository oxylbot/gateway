module.exports = database => {
	const Channels = database.actions.define("channels", {
		id: {
			primaryKey: true,
			type: database.main.TEXT,
			allowNull: false
		},
		guild_id: {
			type: database.main.TEXT,
			allowNull: false
		},
		name: {
			type: database.main.TEXT,
			allowNull: false
		},
		nsfw: {
			type: database.main.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		type: {
			type: database.main.TEXT,
			allowNull: false
		},
		position: {
			type: database.main.INT,
			allowNull: false
		},
		parent_id: {
			type: database.main.TEXT,
			allowNull: false
		},
		user_limit: {
			type: database.main.INT,
			allowNull: false
		}
	});

	return Channels;
};

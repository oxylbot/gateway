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
			allowNull: true
		},
		type: {
			type: database.main.INT,
			allowNull: false
		},
		position: {
			type: database.main.INT,
			allowNull: false
		},
		parent_id: {
			type: database.main.TEXT,
			allowNull: true
		},
		user_limit: {
			type: database.main.INT,
			allowNull: true
		}
	});

	return Channels;
};

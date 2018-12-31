module.exports = database => {
	const Guilds = database.actions.define("guilds", {
		id: {
			type: database.main.TEXT,
			primaryKey: true,
			allowNull: false
		},
		name: {
			type: database.main.TEXT,
			allowNull: false
		},
		icon: {
			type: database.main.TEXT,
			allowNull: true
		},
		owner_id: {
			type: database.main.TEXT,
			allowNull: false
		},
		region: {
			type: database.main.TEXT,
			allowNull: false
		},
		member_count: {
			type: database.main.INT,
			allowNull: false
		}
	});

	return Guilds;
};

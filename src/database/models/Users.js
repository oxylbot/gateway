module.exports = database => {
	const Users = database.actions.define("users", {
		id: {
			type: database.main.TEXT,
			primaryKey: true,
			allowNull: false
		},
		username: {
			type: database.main.TEXT,
			allowNull: false
		},
		discriminator: {
			type: database.main.TEXT,
			allowNull: false
		},
		avatar: {
			type: database.main.TEXT,
			allowNull: false
		},
		bot: {
			type: database.main.BOOLEAN,
			defaultValue: false,
			allowNull: false
		},
		created_at: {
			type: database.main.TIMESTAMP,
			allowNull: false
		}
	});

	return Users;
};

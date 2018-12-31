const Roles = require("./Roles");

module.exports = database => {
	const Members = database.actions.define("members", {
		member_id: {
			type: database.main.TEXT,
			primaryKey: true,
			allowNull: false
		},
		guild_id: {
			type: database.main.TEXT,
			primaryKey: true,
			allowNull: false
		},
		nickname: {
			type: database.main.TEXT,
			allowNull: false
		},
		roles: {
			type: database.main.TEXT,
			allowNull: false
		},
		joined_at: {
			type: database.main.TIMESTAMP,
			allowNull: false
		}
	});

	Members.hasMany(Roles());

	return Members;
};

const Members = require("./Members");

module.exports = database => {
	const Roles = database.actions.define("roles", {
		id: {
			type: database.main.TEXT,
			primaryKey: true,
			allowNull: false
		},
		guild_id: {
			type: database.main.TEXT,
			allowNull: false
		},
		color: {
			type: database.main.INT,
			allowNull: false
		},
		position: {
			type: database.main.INT,
			allowNull: false
		},
		permissions: {
			type: database.main.BIGINT,
			allowNull: false
		}
	});

	Roles.belongsTo(Members, {
		foreignKey: "member_id",
		targetKey: "roles"
	});

	return Roles;
};

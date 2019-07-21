const { Op } = require("sequelize");

module.exports = Role => async (guildId, name) =>
	await Role.findAll({
		where: {
			guildId,
			name: {
				[Op.iLike]: `%${name.replace(/%/g, "\\%").replace(/_/g, "\\_").replace(/\\/g, "\\\\")}%`
			}
		}
	});

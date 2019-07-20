const { Op } = require("sequelize");

module.exports = Channel => async (guildId, name) =>
	await Channel.findAll({
		where: {
			guildId,
			name: {
				[Op.iLike]: name.replace(/%/g, "\\%").replace(/_/g, "\\_").replace(/\\/g, "\\\\")
			}
		}
	});

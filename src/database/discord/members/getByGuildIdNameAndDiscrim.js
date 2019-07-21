const { Op } = require("sequelize");

module.exports = Member => async (guildId, username, discrim) =>
	await Member.findAll({
		where: {
			guildId,
			username: {
				[Op.iLike]: `%${username.replace(/%/g, "\\%").replace(/_/g, "\\_").replace(/\\/g, "\\\\")}%`
			},
			discriminator: discrim
		}
	});

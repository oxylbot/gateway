const { Op } = require("sequelize");

module.exports = User => async username =>
	await User.findAll({
		where: {
			username: {
				[Op.iLike]: `${username.replace(/%/g, "\\%").replace(/_/g, "\\_").replace(/\\/g, "\\\\")}%`
			}
		}
	});

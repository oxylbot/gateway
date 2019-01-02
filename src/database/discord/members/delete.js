const Models = require("../models");

module.exports = async database => async (guild_id, id) => {
	const { MemberModel } = Models(database);

	return await MemberModel.destroy({ where: { guild_id,
		id } });
};

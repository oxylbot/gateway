const Models = require("../../models");

module.exports = async database => async (guildId, userId) => {
	const { MemberModel } = Models(database);

	const members = await MemberModel.find({
		where: {
			guild_id: guildId,
			user_id: userId
		}
	});

	return members.length !== 0 ? members : null;
};

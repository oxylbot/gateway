module.exports = Member => async (guildId, memberId) =>
	await Member.findOne({
		where: {
			guildId,
			id: memberId
		}
	});

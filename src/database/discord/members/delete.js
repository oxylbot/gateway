module.exports = Member => async (guildId, memberId) =>
	await Member.destroy({
		where: {
			guildId,
			id: memberId
		}
	});

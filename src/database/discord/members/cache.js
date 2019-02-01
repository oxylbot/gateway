module.exports = Member => async member =>
	await Member.upsert(member);

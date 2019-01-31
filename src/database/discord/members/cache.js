module.exports = Member => async members =>
	await Promise.all(members.map(member => Member.upsert(member)));

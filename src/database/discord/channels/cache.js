module.exports = Channel => async channel =>
	await Channel.upsert(channel);

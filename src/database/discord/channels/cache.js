module.exports = Channel => async channels =>
	await Promise.all(channels.map(channel => Channel.upsert(channel)));

module.exports = Channel => async id =>
	await Channel.findById(id);

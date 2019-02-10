module.exports = Channel => async id =>
	await Channel.findByPk(id);

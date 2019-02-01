module.exports = Channel => async id =>
	await Channel.destroy({ where: { id } });

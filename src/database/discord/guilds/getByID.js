module.exports = Guild => async id =>
	await Guild.findByPk(id);

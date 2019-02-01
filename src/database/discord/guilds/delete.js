module.exports = Guild => async id =>
	await Guild.destroy({ where: { id } });

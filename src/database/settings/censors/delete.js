module.exports = Censor => async id =>
	await Censor.destroy({ where: { id } });

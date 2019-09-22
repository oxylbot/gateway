module.exports = Censor => async id =>
	await Censor.findByPk(id);

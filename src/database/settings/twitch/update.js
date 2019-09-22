module.exports = Censor => async (id, censor) =>
	await Censor.update(censor, { where: { id } });


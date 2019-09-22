module.exports = Censor => async censor => {
	censor.id = (Date.now() + process.hrtime().reduce((a, b) => a + b, 0)).toString(36);

	return await Censor.create(censor);
};

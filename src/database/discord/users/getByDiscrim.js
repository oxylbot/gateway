module.exports = User => async discrim =>
	await User.findAll({
		where: {
			discriminator: discrim
		}
	});

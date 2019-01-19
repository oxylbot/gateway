module.exports = async Channel => async channels => {
	await Channel.bulkCreate(channels);
};

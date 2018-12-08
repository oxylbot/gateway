module.exports = async client => async discriminator => {
	const query = "SELECT * FROM users WHERE discriminator = ?;";

	return await client.execute(query,
		[discriminator],
		{ prepare: true });
};

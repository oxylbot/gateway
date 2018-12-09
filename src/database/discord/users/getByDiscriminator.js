module.exports = async client => async discriminator => {
	const query = "SELECT * FROM users WHERE discriminator = ?;";

	const { rows } = await client.execute(query,
		[discriminator],
		{ prepare: true });

	return rows;
};

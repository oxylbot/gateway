module.exports = role => {
	if(!role) return undefined;

	return {
		id: role.id,
		guild_id: role.guild_id,
		name: role.name,
		color: role.color,
		position: role.position,
		permissions: Number(role.permissions.toString())
	};
};

module.exports = channel => {
	if(!channel) return undefined;

	return {
		id: channel.id,
		guild_id: channel.guild_id,
		name: channel.name,
		nsfw: channel.nsfw,
		type: channel.type,
		position: channel.position,
		overwrites: channel.overwrites.map(overwrite => ({
			id: overwrite.id,
			type: overwrite.type,
			allow: Number(overwrite.allow.toString()),
			deny: Number(overwrite.deny.toString())
		})),
		parent_id: channel.parent_id,
		user_limit: channel.user_limit
	};
};

const channels = require("../channels/index");
const members = require("../members/index");
const roles = require("../roles/index");
const voiceStates = require("../voiceStates/index");

module.exports = async client => {
	await client.execute("CREATE TABLE IF NOT EXISTS guilds (" +
		"id text PRIMARY KEY, " +
		"name text, " +
		"icon text, " +
		"owner_id text, " +
		"region text, " +
		"memberCount int" +
	");");

	const { cache: cacheChannels } = await channels(client);
	const { cache: cacheMembers } = await members(client);
	const { cache: cacheRoles } = await roles(client);
	const { cache: cacheVoiceStates } = await voiceStates(client);

	return async guilds => {
		if(!Array.isArray(guilds)) guilds = [guilds];
		const queries = [];

		for(const guild of guilds) {
			queries.push({
				query: "INSERT INTO guilds " +
					"(id, name, icon, owner_id, region, member_count) " +
					"VALUES (?, ?, ?, ?, ?, ?);",
				params: [guild.id, guild.name, guild.icon || "", guild.ownerID, guild.region, guild.memberCount]
			});
		}

		await cacheRoles(guilds.reduce((rolesToCache, guild) => rolesToCache.concat(guild.roles), []));
		await cacheChannels(guilds.reduce((channelsToCache, guild) => {
			if(guild.channels) channelsToCache = channelsToCache.concat(guild.channels);

			return channelsToCache;
		}, []));

		await cacheVoiceStates(guilds.reduce((voiceStatesToCache, guild) => {
			if(guild.voiceStates) voiceStatesToCache = voiceStatesToCache.concat(guild.voiceStates);

			return voiceStatesToCache;
		}, []));

		await cacheMembers(guilds.reduce((membersToCache, guild) => {
			if(guild.members) membersToCache = membersToCache.concat(guild.members);

			return membersToCache;
		}, []));

		if(queries.length === 1) {
			const [{ query, params }] = queries;
			return await client.execute(query, params, { prepare: true });
		} else {
			return await client.batch(queries, { prepare: true });
		}
	};
};

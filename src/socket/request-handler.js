module.exports = async (database, type, data) => {
	console.log("Looking to cache a", type, data);
	switch(type) {
		case "Member": {
			await module.exports(database, "User", data.user);
			await database.members.cache({
				id: data.user.id,
				guildId: data.guildId,
				nickname: data.nickname,
				roles: data.roles,
				joinedAt: data.joinedAt
			});

			break;
		}

		case "Role": {
			await database.roles.cache({
				id: data.id,
				guildId: data.guildId,
				color: data.color,
				position: data.position,
				permissions: data.permissions.toString()
			});

			break;
		}

		case "User": {
			console.log("Caching user!");
			await database.users.cache({
				id: data.id,
				username: data.username,
				discriminator: data.discriminator,
				avatar: data.avatar,
				bot: data.bot
			});

			break;
		}

		case "Channel": {
			await database.channels.cache({
				id: data.id,
				guildId: data.guildId,
				name: data.name,
				nsfw: data.nsfw,
				type: data.type,
				position: data.position,
				parentId: data.parentId,
				overwrites: data.overwrites.map(overwrite => ({
					id: overwrite.id,
					type: overwrite.type,
					allow: overwrite.allow.toString(),
					deny: overwrite.deny.toString()
				})),
				userLimit: data.userLimit
			});

			break;
		}

		case "Guild": {
			await database.guilds.cache({
				id: data.id,
				name: data.name,
				icon: data.icon,
				ownerId: data.ownerId,
				region: data.region,
				memberCount: data.memberCount
			});

			if(data.roles) await Promise.all(data.roles.map(role => module.exports(database, "Role", role)));
			if(data.members) await Promise.all(data.members.map(member => module.exports(database, "Member", member)));
			if(data.channels) await Promise.all(data.channels.map(channel => module.exports(database, "Channel", channel)));
			if(data.voiceStates) {
				await Promise.all(data.voiceStates.map(state => module.exports(database, "VoiceState", state)));
			}

			break;
		}

		case "VoiceState": {
			await database.voiceStates.cache({
				guildId: data.guildId,
				userId: data.userId,
				channelId: data.channelId,
				deaf: data.deaf,
				mute: data.mute,
				selfDeaf: data.selfDeaf,
				selfMute: data.selfMute
			});

			break;
		}

		default: {
			console.log("Failed to cache", type, data, "because it matched no types");

			break;
		}
	}
};

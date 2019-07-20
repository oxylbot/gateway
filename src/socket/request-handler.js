module.exports = async (db, type, data) => {
	switch(type) {
		case "Member": {
			await module.exports(db, "User", data.user);
			await db.discord.members.cache({
				id: data.user.id,
				guildId: data.guildId,
				nickname: data.nickname,
				roles: data.roles,
				joinedAt: data.joinedAt
			});

			break;
		}

		case "Role": {
			await db.discord.roles.cache({
				id: data.id,
				guildId: data.guildId,
				color: data.color,
				position: data.position,
				permissions: data.permissions.toString()
			});

			break;
		}

		case "User": {
			await db.discord.users.cache({
				id: data.id,
				username: data.username,
				discriminator: data.discriminator,
				avatar: data.avatar,
				bot: data.bot
			});

			break;
		}

		case "Channel": {
			await db.discord.channels.cache({
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
			await db.discord.guilds.cache({
				id: data.id,
				name: data.name,
				icon: data.icon,
				ownerId: data.ownerId,
				region: data.region,
				memberCount: data.memberCount
			});

			if(data.roles) await Promise.all(data.roles.map(role => module.exports(db, "Role", role)));
			if(data.members) await Promise.all(data.members.map(member => module.exports(db, "Member", member)));
			if(data.channels) await Promise.all(data.channels.map(channel => module.exports(db, "Channel", channel)));
			if(data.voiceStates) {
				await Promise.all(data.voiceStates.map(state => module.exports(db, "VoiceState", state)));
			}

			break;
		}

		case "VoiceState": {
			await db.discord.voiceStates.cache({
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
			console.warn("Failed to cache", type, data, "because it matched no types");

			break;
		}
	}
};

const constants = require("../constants");

module.exports = async (ws, message) => {
	const r = ws.locals.server.locals.r;

	switch(message.d.type) {
		case "member": {
			const member = {
				id: message.d.id,
				guildID: message.d.guildID,
				nickname: message.d.nickname,
				roles: message.d.roles,
				joinedAt: message.d.joinedAt
			};

			const { inserted } = await r.table("members")
				.insert(member, { conflict: "update" })
				.run();

			if(inserted) {
				const user = {
					id: message.d.user.id,
					username: message.d.user.username,
					discriminator: message.d.user.discriminator,
					avatar: message.d.user.avatar || null,
					bot: !!message.d.user.bot
				};

				await r.table("users")
					.insert(user, { conflict: "update" })
					.run();
			}


			break;
		}

		case "role": {
			const role = {
				id: message.d.id,
				guildID: message.d.guildID,
				name: message.d.name,
				color: message.d.color,
				position: message.d.position,
				permissions: message.d.permissions
			};

			await r.table("roles")
				.insert(role, { conflict: "update" })
				.run();

			break;
		}

		case "user": {
			const user = {
				id: message.d.id,
				username: message.d.username,
				discriminator: message.d.discriminator,
				avatar: message.d.avatar || null,
				bot: !!message.d.bot
			};

			await r.table("users")
				.insert(user, { conflict: "update" })
				.run();

			break;
		}

		case "guild": {
			const guild = {
				id: message.d.id,
				name: message.d.name,
				icon: message.d.icon || null,
				ownerID: message.d.ownerID,
				region: message.d.region,
				memberCount: message.d.memberCount
			};

			await r.table("roles")
				.insert(message.d.roles.map(role => ({
					id: role.id,
					guildID: message.d.id,
					name: role.name,
					color: role.color,
					position: role.position,
					permissions: role.permissions
				})), { conflict: "update" })
				.run();

			if(message.d.channels) {
				await r.table("channels")
					.insert(message.d.channels.map(channel => ({
						id: channel.id,
						guildID: message.d.id,
						type: {
							0: "text",
							1: "dm",
							2: "voice",
							3: "groupdm",
							4: "category"
						}[channel.type],
						position: channel.position,
						name: channel.name,
						nsfw: !!channel.nsfw
					})), { conflict: "update" })
					.run();
			}

			if(message.d.voiceStates) {
				await r.table("voiceStates")
					.insert(message.d.voiceStates.map(voiceState => ({
						id: [message.d.id, voiceState.userID],
						guildID: message.d.id,
						channelID: voiceState.channelID,
						userID: voiceState.userID,
						deaf: !!voiceState.deaf,
						mute: !!voiceState.mute,
						selfDeaf: !!voiceState.selfDeaf,
						selfMute: !!voiceState.selfMute
					})), { conflict: "update" })
					.run();
			}

			if(message.d.members) {
				await r.table("members")
					.insert(message.d.members.map(member => ({
						id: member.id,
						guildID: message.d.id,
						nickname: member.nickname,
						roles: member.roles,
						joinedAt: member.joinedAt
					})), { conflict: "update" })
					.run();

				await r.table("users")
					.insert(message.d.members.map(({ user }) => ({
						id: user.id,
						username: user.username,
						discriminator: user.discriminator,
						avatar: user.avatar || null,
						bot: !!user.bot
					})), { conflict: "update" })
					.run();
			}

			await r.table("guilds")
				.insert(guild, { conflict: "update" })
				.run();

			break;
		}

		case "channel": {
			const channel = {
				id: message.d.id,
				guildID: message.d.guildID,
				type: {
					0: "text",
					1: "dm",
					2: "voice",
					3: "groupdm",
					4: "category"
				}[message.d.type],
				position: message.d.position,
				name: message.d.name,
				nsfw: !!message.d.nsfw
			};

			if(message.d.overwrites) channel.overwrites = message.d.overwrites;
			if(message.d.userLimit) channel.overwrites = message.d.userLimit;
			if(message.d.parentID) channel.parentID = message.d.parentID;

			await r.table("channels")
				.insert(channel, { conflict: "update" })
				.run();

			break;
		}

		case "voiceState": {
			const voiceState = {
				id: [message.d.guildID, message.d.userID],
				guildID: message.d.guildID,
				channelID: message.d.channelID,
				userID: message.d.userID,
				deaf: !!message.d.deaf,
				mute: !!message.d.mute,
				selfDeaf: !!message.d.selfDeaf,
				selfMute: !!message.d.selfMute
			};

			await r.table("voiceStates")
				.insert(voiceState, { conflict: "update" })
				.run();

			break;
		}

		default: {
			ws.close(constants.CLOSE_CODES.INVALID_PAYLOAD, `invalid cache type: ${message.d.type}`);

			break;
		}
	}
};

const Sequelize = require("sequelize");

module.exports = sequelize => {
	const Guild = sequelize.define("guild", {
		id: {
			type: Sequelize.STRING,
			primaryKey: true,
			allowNull: false,
			field: "id"
		},
		name: {
			type: Sequelize.STRING(100),
			allowNull: false,
			field: "name"
		},
		icon: {
			type: Sequelize.STRING,
			allowNull: true,
			field: "icon"
		},
		ownerId: {
			type: Sequelize.STRING,
			allowNull: false,
			field: "owner_id"
		},
		region: {
			type: Sequelize.STRING,
			allowNull: false,
			field: "region"
		},
		memberCount: {
			type: Sequelize.INTEGER,
			allowNull: false,
			field: "member_count"
		}
	}, {
		timestamps: false,
		tableName: "guilds"
	});

	const User = sequelize.define("user", {
		id: {
			type: Sequelize.STRING,
			primaryKey: true,
			allowNull: false,
			field: "id"
		},
		username: {
			type: Sequelize.STRING(32),
			allowNull: false,
			field: "username"
		},
		discriminator: {
			type: Sequelize.STRING(4),
			allowNull: false,
			field: "discriminator"
		},
		avatar: {
			type: Sequelize.STRING,
			allowNull: false,
			field: "avatar"
		},
		bot: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: false,
			field: "bot"
		},
		createdAt: {
			type: Sequelize.DATE,
			allowNull: false,
			field: "created_at"
		}
	}, {
		timestamps: false,
		tableName: "users",
		indexes: [{
			name: "username",
			fields: ["username"]
		}, {
			name: "discriminator",
			fields: ["discriminator"]
		}]
	});

	const Channel = sequelize.define("channel", {
		id: {
			primaryKey: true,
			type: Sequelize.STRING,
			allowNull: false,
			field: "id"
		},
		guildId: {
			type: Sequelize.STRING,
			allowNull: false,
			field: "guild_id"
		},
		name: {
			type: Sequelize.STRING(100),
			allowNull: false,
			field: "name"
		},
		nsfw: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			field: "nsfw"
		},
		type: {
			type: Sequelize.TINYINT,
			allowNull: false,
			field: "type"
		},
		position: {
			type: Sequelize.SMALLINT,
			allowNull: false,
			field: "position"
		},
		parentId: {
			type: Sequelize.STRING,
			allowNull: true,
			field: "parent_id"
		},
		userLimit: {
			type: Sequelize.TINYINT,
			allowNull: true,
			field: "user_limit"
		}
	}, {
		timestamps: false,
		tableName: "guild_channels",
		indexes: [{
			name: "guild_id",
			fields: ["guild_id"]
		}]
	});

	const Member = sequelize.define("member", {
		id: {
			type: Sequelize.STRING,
			primaryKey: true,
			allowNull: false,
			field: "id"
		},
		guildId: {
			type: Sequelize.STRING,
			primaryKey: true,
			allowNull: false,
			field: "guild_id"
		},
		nickname: {
			type: Sequelize.STRING(32),
			allowNull: false,
			field: "nickname"
		},
		roles: {
			type: Sequelize.ARRAY({
				type: sequelize.STRING,
				allowNull: false
			}),
			allowNull: false,
			field: "roles"
		},
		joinedAt: {
			type: Sequelize.DATE,
			allowNull: false,
			field: "joined_at"
		}
	}, {
		timestamps: false,
		tableName: "members",
		indexes: [{
			name: "nickname",
			fields: ["nickname"]
		}]
	});

	const Role = sequelize.define("roles", {
		id: {
			type: Sequelize.STRING,
			primaryKey: true,
			allowNull: false,
			field: "id"
		},
		guildId: {
			type: Sequelize.STRING,
			allowNull: false,
			field: "guild_id"
		},
		color: {
			type: Sequelize.INTEGER,
			allowNull: false,
			field: "color"
		},
		position: {
			type: Sequelize.SMALLINT,
			allowNull: false,
			field: "position"
		},
		permissions: {
			type: Sequelize.BIGINT,
			allowNull: false,
			field: "permissions"
		}
	}, {
		timestamps: false,
		tableName: "roles",
		indexes: [{
			name: "guild_id",
			fields: ["guild_id"]
		}]
	});

	const VoiceState = sequelize.define("voicestates", {
		channelId: {
			type: Sequelize.STRING,
			allowNull: false,
			field: "channel_id"
		},
		guildId: {
			type: Sequelize.STRING,
			primaryKey: true,
			allowNull: false,
			field: "guild_id"
		},
		userId: {
			type: Sequelize.STRING,
			primaryKey: true,
			allowNull: false,
			field: "user_id"
		},
		deaf: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: false,
			field: "deaf"
		},
		mute: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: false,
			field: "mute"
		},
		selfDeaf: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: false,
			field: "self_deaf"
		},
		selfMute: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: false,
			field: "self_mute"
		}
	}, {
		timestamps: false,
		tableName: "voice_states",
		indexes: [{
			name: "channel_id",
			fields: ["channel_id"]
		}]
	});

	return {
		Channel,
		Guild,
		Member,
		Role,
		User,
		VoiceState
	};
};

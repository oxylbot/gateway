const Sequelize = require("sequelize");

module.exports = {
	Guild: [{
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
	}],
	User: [{
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
		}
	}, {
		timestamps: false,
		tableName: "users",
		indexes: [{
			fields: ["username"]
		}, {
			fields: ["discriminator"]
		}]
	}],
	Channel: [{
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
		overwrites: {
			type: Sequelize.ARRAY({
				type: Sequelize.JSONB,
				allowNull: false
			}),
			allowNull: false,
			field: "overwrites"
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
			type: Sequelize.SMALLINT,
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
			type: Sequelize.SMALLINT,
			allowNull: true,
			field: "user_limit"
		}
	}, {
		timestamps: false,
		tableName: "guild_channels",
		indexes: [{
			fields: ["guild_id"]
		}]
	}],
	Member: [{
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
				type: Sequelize.STRING,
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
			fields: ["nickname"]
		}]
	}],
	Role: [{
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
			fields: ["guild_id"]
		}]
	}],
	VoiceState: [{
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
		channelId: {
			type: Sequelize.STRING,
			allowNull: false,
			field: "channel_id"
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
			fields: ["channel_id"]
		}]
	}]
};

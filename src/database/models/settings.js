const Sequelize = require("sequelize");

module.exports = {
	Censor: [{
		guildId: {
			type: Sequelize.STRING,
			allowNull: false,
			field: "guild_id"
		},
		id: {
			type: Sequelize.STRING,
			primaryKey: true,
			allowNull: false,
			field: "id"
		},
		name: {
			type: Sequelize.STRING(64),
			allowNull: false,
			field: "name"
		},
		description: {
			type: Sequelize.STRING(512),
			allowNull: false,
			field: "description"
		},
		punishment: {
			type: Sequelize.STRING(64),
			allowNull: false,
			field: "punishment"
		},
		duration: {
			type: Sequelize.INTEGER,
			allowNull: true,
			field: "duration"
		},
		regex: {
			type: Sequelize.STRING,
			allowNull: false,
			field: "regex"
		},
		whitelistedRoles: {
			type: Sequelize.ARRAY({
				type: Sequelize.STRING,
				allowNull: false
			}),
			allowNull: false,
			field: "whitelisted_roles"
		}
	}, {
		timestamps: false,
		tableName: "settings_censors",
		indexes: [{
			fields: ["guild_id"]
		}]
	}],
	Channels: [{
		guildId: {
			primaryKey: true,
			type: Sequelize.STRING,
			allowNull: false,
			field: "guild_id"
		},
		enabled: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: false,
			field: "enabled"
		},
		categoryId: {
			type: Sequelize.STRING,
			allowNull: false,
			field: "category_id"
		}
	}, {
		timestamps: false,
		tableName: "settings_channels",
		indexes: [{
			fields: ["guild_id"]
		}]
	}],
	ModLog: [{
		guildId: {
			primaryKey: true,
			type: Sequelize.STRING,
			allowNull: false,
			field: "guild_id"
		},
		enabled: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: false,
			field: "enabled"
		},
		channelId: {
			type: Sequelize.STRING,
			allowNull: false,
			field: "channel_id"
		},
		warningDuration: {
			type: Sequelize.INTEGER,
			allowNull: true,
			field: "warning_duration"
		},
		thresholds: {
			type: Sequelize.ARRAY({
				type: Sequelize.JSONB,
				allowNull: false
			}),
			allowNull: false,
			field: "thresholds"
		}
	}, {
		timestamps: false,
		tableName: "settings_mod_log",
		indexes: [{
			fields: ["guild_id"]
		}]
	}],
	Music: [{
		guildId: {
			primaryKey: true,
			type: Sequelize.STRING,
			allowNull: false,
			field: "guild_id"
		},
		nowPlayingMessages: {
			type: Sequelize.BOOLEAN,
			defaultValue: true,
			allowNull: false,
			field: "now_playing_messages"
		},
		voteSkip: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: false,
			field: "vote_skip"
		},
		maxLength: {
			type: Sequelize.INTEGER,
			allowNull: true,
			field: "max_length"
		}
	}, {
		timestamps: false,
		tableName: "settings_music",
		indexes: [{
			fields: ["guild_id"]
		}]
	}],
	Permissions: [{
		guildId: {
			type: Sequelize.STRING,
			allowNull: false,
			field: "guild_id"
		},
		roleId: {
			type: Sequelize.STRING,
			primaryKey: true,
			allowNull: false,
			field: "role_id"
		},
		disabledCommands: {
			type: Sequelize.ARRAY({
				type: Sequelize.STRING,
				allowNull: false
			}),
			allowNull: false,
			field: "disabled_commands"
		},
		enabledCommands: {
			type: Sequelize.ARRAY({
				type: Sequelize.STRING,
				allowNull: false
			}),
			allowNull: false,
			field: "enabled_commands"
		}
	}, {
		timestamps: false,
		tableName: "settings_permissions",
		indexes: [{
			fields: ["guild_id"]
		}]
	}],
	Prefix: [{
		guildId: {
			primaryKey: true,
			type: Sequelize.STRING,
			allowNull: false,
			field: "guild_id"
		},
		prefix: {
			type: Sequelize.STRING(20),
			allowNull: true,
			field: "prefix"
		},
		overwrite: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: false,
			field: "overwrite"
		}
	}, {
		timestamps: false,
		tableName: "settings_prefix",
		indexes: [{
			fields: ["guild_id"]
		}]
	}],
	Reddit: [{
		guildId: {
			type: Sequelize.STRING,
			allowNull: false,
			field: "guild_id"
		},
		id: {
			type: Sequelize.STRING,
			primaryKey: true,
			allowNull: false,
			field: "id"
		},
		subreddit: {
			type: Sequelize.STRING(20),
			allowNull: false,
			field: "subreddit"
		},
		feedType: {
			type: Sequelize.STRING(32),
			allowNull: false,
			field: "feed_type"
		},
		channelId: {
			type: Sequelize.STRING,
			allowNull: false,
			field: "channel_id"
		}
	}, {
		timestamps: false,
		tableName: "settings_reddit",
		indexes: [{
			fields: ["guild_id"]
		}]
	}],
	AutoRole: [{
		guildId: {
			primaryKey: true,
			type: Sequelize.STRING,
			allowNull: false,
			field: "guild_id"
		},
		roles: {
			type: Sequelize.ARRAY({
				type: Sequelize.STRING,
				allowNull: false
			}),
			allowNull: false,
			field: "roles"
		}
	}, {
		timestamps: false,
		tableName: "settings_auto_role",
		indexes: [{
			fields: ["guild_id"]
		}]
	}],
	AutoRoleBot: [{
		guildId: {
			primaryKey: true,
			type: Sequelize.STRING,
			allowNull: false,
			field: "guild_id"
		},
		roles: {
			type: Sequelize.ARRAY({
				type: Sequelize.STRING,
				allowNull: false
			}),
			allowNull: false,
			field: "roles"
		}
	}, {
		timestamps: false,
		tableName: "settings_auto_role_bots",
		indexes: [{
			fields: ["guild_id"]
		}]
	}],
	RoleMe: [{
		guildId: {
			primaryKey: true,
			type: Sequelize.STRING,
			allowNull: false,
			field: "guild_id"
		},
		roles: {
			type: Sequelize.ARRAY({
				type: Sequelize.STRING,
				allowNull: false
			}),
			allowNull: false,
			field: "roles"
		}
	}, {
		timestamps: false,
		tableName: "settings_role_me",
		indexes: [{
			fields: ["guild_id"]
		}]
	}],
	Suggestions: [{
		guildId: {
			primaryKey: true,
			type: Sequelize.STRING,
			allowNull: false,
			field: "guild_id"
		},
		enabled: {
			type: Sequelize.BOOLEAN,
			defaultValue: true,
			allowNull: false,
			field: "enabled"
		},
		channelId: {
			type: Sequelize.STRING,
			allowNull: true,
			field: "channel_id"
		}
	}, {
		timestamps: false,
		tableName: "settings_suggestions",
		indexes: [{
			fields: ["guild_id"]
		}]
	}],
	Twitch: [{
		guildId: {
			type: Sequelize.STRING,
			allowNull: false,
			field: "guild_id"
		},
		id: {
			type: Sequelize.STRING,
			primaryKey: true,
			allowNull: false,
			field: "id"
		},
		channelName: {
			type: Sequelize.STRING(32),
			allowNull: false,
			field: "twitch_channel_name"
		},
		channelId: {
			type: Sequelize.STRING,
			allowNull: false,
			field: "discord_channel_id"
		}
	}, {
		timestamps: false,
		tableName: "settings_twitch",
		indexes: [{
			fields: ["guild_id"]
		}]
	}]
};

const Sequelize = require("sequelize");

module.exports = sequelize => {
	const Guild = sequelize.define("guild", {
		id: {
			type: Sequelize.STRING,
			primaryKey: true,
			allowNull: false
		},
		name: {
			type: Sequelize.STRING(100),
			allowNull: false
		},
		icon: {
			type: Sequelize.STRING,
			allowNull: true
		},
		ownerId: {
			type: Sequelize.STRING,
			allowNull: false
		},
		region: {
			type: Sequelize.STRING,
			allowNull: false
		},
		memberCount: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	}, {
		timestamps: false,
		underscored: true,
		tableName: "guilds"
	});

	const User = sequelize.define("user", {
		id: {
			type: Sequelize.STRING,
			primaryKey: true,
			allowNull: false
		},
		username: {
			type: Sequelize.STRING(32),
			allowNull: false
		},
		discriminator: {
			type: Sequelize.STRING(4),
			allowNull: false
		},
		avatar: {
			type: Sequelize.STRING,
			allowNull: false
		},
		bot: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: false
		},
		createdAt: {
			type: Sequelize.DATE,
			allowNull: false
		}
	}, {
		timestamps: false,
		underscored: true,
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
			allowNull: false
		},
		name: {
			type: Sequelize.STRING(100),
			allowNull: false
		},
		nsfw: {
			type: Sequelize.BOOLEAN,
			allowNull: true
		},
		type: {
			type: Sequelize.TINYINT,
			allowNull: false
		},
		position: {
			type: Sequelize.SMALLINT,
			allowNull: false
		},
		parentId: {
			type: Sequelize.STRING,
			allowNull: true
		},
		userLimit: {
			type: Sequelize.TINYINT,
			allowNull: true
		}
	}, {
		timestamps: false,
		underscored: true,
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
			allowNull: false
		},
		nickname: {
			type: Sequelize.STRING(32),
			allowNull: false
		},
		roles: {
			type: Sequelize.ARRAY({
				type: sequelize.STRING,
				allowNull: false
			}),
			allowNull: false
		},
		joinedAt: {
			type: Sequelize.DATE,
			allowNull: false
		}
	}, {
		timestamps: false,
		underscored: true,
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
			allowNull: false
		},
		color: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		position: {
			type: Sequelize.SMALLINT,
			allowNull: false
		},
		permissions: {
			type: Sequelize.BIGINT,
			allowNull: false
		}
	}, {
		timestamps: false,
		underscored: true,
		tableName: "roles",
		indexes: [{
			name: "guild_id",
			fields: ["guild_id"]
		}]
	});

	const VoiceState = sequelize.define("voicestates", {
		deaf: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: false
		},
		mute: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: false
		},
		selfDeaf: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: false
		},
		selfMute: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: false
		}
	}, {
		timestamps: false,
		underscored: true,
		tableName: "voice_states",
		indexes: [{
			name: "guild_id_and_member_id",
			fields: ["guild_id", "member_id"],
			unique: true
		}, {
			name: "channel_id",
			fields: ["channel_id"]
		}]
	});

	Guild.hasMany(Role);
	Guild.hasMany(Channel);
	Guild.hasMany(Member);
	Guild.hasMany(VoiceState);

	Channel.hasMany(VoiceState);
	Channel.belongsTo(Guild);

	VoiceState.belongsTo(Member);
	VoiceState.belongsTo(Channel);
	VoiceState.belongsTo(Guild);

	Member.belongsTo(Guild);
	Member.belongsTo(User);

	User.hasMany(Member);

	return {
		Channel,
		Guild,
		Member,
		Role,
		User,
		VoiceState
	};
};

const discordModels = require("./discord");
const settingsModels = require("./settings");

function registerModels(modelList, db) {
	return Object.entries(modelList).reduce((models, [modelName, modelData]) => {
		models[modelName] = db.define(modelData[1].tableName, modelData[0], modelData[1]);

		return models;
	}, {});
}

module.exports = db => ({
	discord: registerModels(discordModels, db),
	settings: registerModels(settingsModels, db)
});

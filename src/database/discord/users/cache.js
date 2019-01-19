const Models = require("../../models");

module.exports = async database => async users => {
	const { UserModel } = Models(database);
	const userObjects = [];

	for(const user of users) {
		const userObject = await UserModel.create(user);
		userObjects.push(userObject.get({ plain: true }));
	}

	return userObjects.length !== 0 ? userObjects : null;
};

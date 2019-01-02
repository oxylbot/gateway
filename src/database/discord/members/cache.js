const Models = require("../models");

module.exports = async database => async members => {
	const { MemberModel } = Models(database);
	const memberObjects = [];

	for (const member of members) {
		try {
			const memberObject = await MemberModel.create(member);
			memberObjects.push(memberObject.get({ plain: true }));
		} catch (error) {
			console.log(error)	
		}
	}
}
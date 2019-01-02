const Models = require("../models");

module.exports = async database => async id => {
	const { RoleModel } = Models(database);

	try {
		return await RoleModel.destroy({ where: { id } })
	} catch (error) {
		console.log(error)
	}
}
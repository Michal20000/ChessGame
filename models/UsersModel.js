const mongoose = require('mongoose');
const MongooseSchema = mongoose.Schema;

const UsersSchemaData = {
	username: {
		type: String

	},
	email: {
		type: String

	},
	password: {
		type: String

	},
	wins: {
		type: Number,
		default: 0

	},
	draws: {
		type: Number,
		default: 0

	},
	losses: {
		type: Number,
		default: 0

	}

};
const UsersCollectionData = {
	collection: 'users'

};
const UsersSchema = new MongooseSchema(UsersSchemaData, UsersCollectionData);
const UsersModel = mongoose.model('UsersModel', UsersSchema);
UsersModel.createCollection();

module.exports = UsersModel;

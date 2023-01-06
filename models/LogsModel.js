const mongoose = require('mongoose');
const MongooseSchema = mongoose.Schema;

const LogsSchemaData = {
	contents: {
		type: String

	},
	date: {
		type: Date,
		default: Date.now

	}

};
const LogsCollectionData = {
	collection: 'logs'

};
const LogsSchema = new MongooseSchema(LogsSchemaData, LogsCollectionData);
const LogsModel = mongoose.model('LogsModel', LogsSchema);
LogsModel.createCollection();

module.exports = LogsModel;

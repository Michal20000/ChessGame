require('./models/Connection');
const LogsModel = require('./models/LogsModel');
const UsersModel = require('./models/UsersModel');

console.log('Here!');

const log = new LogsModel();
log.contents = 'Something is not right!';
log.save();

console.log('Here!');

const user = new UsersModel();
user.username = 'YMM';
user.email = 'YMM';
user.password = 'YMM';
user.save();

console.log('Here!');

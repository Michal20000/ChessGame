const GenerateHash = require('../utilities/GenerateHash');
const ReturnSession = require('../utilities/ReturnSession');
const UsersModel = require('../models/UsersModel');

const RegisterController = async (socket, data) => {
	let hash = data.hash;
	let mainData = data.mainData;
	let session = ReturnSession(hash);

	if (mainData.username && mainData.email && mainData.password) {
		let usernameData = mainData.username
		let emailData = mainData.email;
		let passwordData = mainData.password;
		// TODO: Some Validation
		// TODO: MongoDB
		// TODO: CHECK IF EMAIL AND USERNAME EXISTS IN DB

		let existsData = await UsersModel.exists({username: usernameData, email: emailData});
		console.log('Exists: ', existsData);
		if (existsData) return;

		let passwordHash = GenerateHash(passwordData);
		console.log('Hash: ', passwordHash);
		let user = new UsersModel();
		user.username = usernameData;
		user.email = emailData;
		user.password = passwordHash;
		user.save();

		session['username'] = usernameData;
		session['email'] = emailData
		socket.join(session['username']);

		let responseData = {
			profile: true

		};
		socket.emit('RegisterResponse', responseData);

		// 	if (username does not exists &&
		//		email does not exists)
		//		Socket.Emit('RegisterResponse')

	}
	console.log('Register Request');

}

module.exports = RegisterController;

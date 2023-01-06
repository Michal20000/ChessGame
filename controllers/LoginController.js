const CompareHash = require('../utilities/CompareHash');
const ReturnSession = require('../utilities/ReturnSession');
const UsersModel = require('../models/UsersModel');

const LoginController = async (socket, data) => {
	let hash = data.hash;
	let mainData = data.mainData;
	let session = ReturnSession(hash);

	if (mainData.username && mainData.password) {
		let usernameData = mainData.username;
		let passwordData = mainData.password;

		let existsData = await UsersModel.exists({username: usernameData});
		console.log('Exists: ', existsData);
		if (!existsData) return;

		UsersModel.findOne({username: usernameData}, (error, user) => {
			if (!error) {
				if (CompareHash(passwordData, user.password)) {
					session['username'] = user.username;
					session['email'] = user.email;
					socket.join(session['username']);

					let responseData = {
						profile: true
	
					};
					socket.emit('LoginResponse', responseData);

				}

			}

		});

	}

	console.log('Login Request');

}

module.exports = LoginController;

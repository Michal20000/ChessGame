const ReturnSession = require('../utilities/ReturnSession');
const Authorization = require('../utilities/Authorization');
const UsersModel = require('../models/UsersModel');

const ProfileController = async (socket, data) => {
	let hash = data.hash;
	let mainData = data.mainData;
	let session = ReturnSession(hash);

	if (Authorization(session)) {
		UsersModel.findOne({username: session['username']}, (error, user) => {
			if (!error) {
				let dataResponse = {
					username: session['username'],
					wins: user.wins,
					draws: user.draws,
					losses: user.losses
		
				};
				socket.emit('ProfileResponse', dataResponse);

			}

		});

	}

	console.log('Profile Request');

}

module.exports = ProfileController;

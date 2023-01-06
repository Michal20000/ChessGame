const ReturnSession = require('../utilities/ReturnSession');
const ClearSession = require('../utilities/ClearSession');

const LogoutController = (socket, data) => {
	let hash = data.hash;
	let mainData = data.mainData;
	let session = ReturnSession(hash);

	socket.leave(session['username']);
	ClearSession(hash);
	
	let responseData = {
		profile: false

	};
	socket.emit('LogoutResponse', responseData);
	console.log('Logout Request');

}

module.exports = LogoutController;

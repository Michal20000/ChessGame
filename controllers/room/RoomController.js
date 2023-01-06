const ReturnSession = require('../../utilities/ReturnSession');
const Authorization = require('../../utilities/Authorization');
const JoinRoom = require('../../utilities/room/JoinRoom');
const CreateRoom = require('../../utilities/room/CreateRoom');

const RoomController = (socket, data) => {
	let hash = data.hash;
	let mainData = data.mainData;
	let session = ReturnSession(hash);

	// global.rooms = new Map();
	// idea: session.chessGame := { null or gameId }
	// 

	// const timer = setTimeout(Function, delay);
	// const timer = setInterval(Function, delay);
	// clearTimeout(timer);
	// clearInterval(timer);

	// class ChessGame
	// Gdy jest już 2 graczy -> Odpalamy zegarek
	// Odliczamy czas - Wykonanie ruchu zmienia
	// Ktoremu graczowi odejmowany jest czas
	
	if (Authorization(session)) { // && notInGame !IMPORTANT
		if (JoinRoom(socket, session, mainData.duration)) {
			console.log('Join Room');

		}
		else {
			CreateRoom(socket, session, mainData.duration);
			console.log('Create Room');

		}
		// IF ROOM EXISTS - JOIN
		// ELSE - CREATE

	}

	console.log('Room Request');

}

module.exports = RoomController;

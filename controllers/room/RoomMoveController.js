const ReturnSession = require('../../utilities/ReturnSession');
const Authorization = require('../../utilities/Authorization');
const InRoom = require('../../utilities/room/InRoom');
const MoveRoom = require('../../utilities/room/MoveRoom');

const RoomMoveController = (socket, data) => {
	let hash = data.hash;
	let mainData = data.mainData;
	let session = ReturnSession(hash);

	if (Authorization(session) && InRoom(session)) {
		MoveRoom(socket, session, mainData);
		console.log('Move!');

	}

	console.log('Room Move Request');

}

module.exports = RoomMoveController;

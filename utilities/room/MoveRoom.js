const RoomResponse = require('./RoomResponse');
const HandleRoom = require('./HandleRoom');

const MoveRoom = (socket, session, mainData) => {
	let room = global.rooms.get(session['room']);
	if (room) {
		if (room.chessEngine.gameState == 0 && session.username == room.white) {
			let state = room.chessEngine.Querry(mainData);
			if (state != null) {
				RoomResponse(room);
				HandleRoom(room, state);
				// CHECK STATES

			}

		}
		else if (room.chessEngine.gameState == 1 && session.username == room.black) {
			let state = room.chessEngine.Querry(mainData);
			if (state != null) {
				RoomResponse(room);
				HandleRoom(room, state);
				// CHECK STATES
				
			}

		}

	}

}

module.exports = MoveRoom;

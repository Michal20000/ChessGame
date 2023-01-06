const ChessEngine = require('../ChessEngine');
const RandomRange = require('../RandomRange');
const RoomResponse = require('./RoomResponse');
const HandleRoom = require('./HandleRoom');

const JoinRoom = (socket, session, duration) => {
	for (let [id, room] of global.rooms) {
		console.log(duration);
		if (room.running == false && room.kind == GameKind(duration)) {
			console.log('HERE!!!');
			room.running = true;
			room.chessEngine = new ChessEngine();
			if (RandomRange(0, 2) == 0) {
				room.white = id;
				room.black = session['username'];

			}
			else {
				room.white = session['username'];
				room.black = id;

			}
			room.whiteDraw = false;
			room.blackDraw = false;
			session['room'] = id;
			let routineFunction = () => {
				if (global.rooms.get(id)) {
					if (room.chessEngine.gameState == 0) {
						room.whiteTime -= 1;
						if (room.whiteTime == 0) {
							console.log('Black Wins On Time');
							HandleRoom(room, 12);
							// BLACK WINS

						}

					}
					else if ((room.chessEngine.gameState == 1)) {
						room.blackTime -= 1;
						if (room.blackTime == 0) {
							console.log('White Wins On Time');
							HandleRoom(room, 11);
							// WHITE WINS

						}

					}
					//console.log('W: ', room.whiteTime, 'B: ', room.blackTime);
					setTimeout(routineFunction, 1000);

				}

			};
			setTimeout(routineFunction, 1000);
			// TODO: TIMER


			RoomResponse(room);
			return true;

		}

	}
	return false;

}

const GameKind = (duration) => {
	switch(duration) {
		case 60: return 'BULLET 1 + 0';
		case 180: return 'BLITZ 3 + 0';
		case 600: return 'RAPID 10 + 0';
		case 1800: return 'CLASSICAL 30 + 0';
		default: return 'OTHER';

	}

}

module.exports = JoinRoom;

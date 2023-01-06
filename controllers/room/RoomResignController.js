const ReturnSession = require('../../utilities/ReturnSession');
const Authorization = require('../../utilities/Authorization');
const InRoom = require('../../utilities/room/InRoom');
const RoomClear = require('../../utilities/room/RoomClear');
const UsersModel = require('../../models/UsersModel');

const RoomResignController = (socket, data) => {
	let hash = data.hash;
	let mainData = data.mainData;
	let session = ReturnSession(hash);
	
	if (Authorization(session)) { // && notInGame !IMPORTANT
		if (InRoom(session)) {
			let room = global.rooms.get(session['room']);
			if (room.white == session['username']) {
				console.log('Black Wins!');
				data = {
					result: 'BLACK WINS'
		
				};
				// EMIT RESULT
				global.io.to(room.white).emit('RoomResult', data);
				global.io.to(room.black).emit('RoomResult', data);
				// MONGO DB SAVE
				UsersModel.findOne({username: room.white}, (error, user) => {
					if (!error) {
						user.losses += 1;
						user.save();
		
					}
		
				});
				UsersModel.findOne({username: room.black}, (error, user) => {
					if (!error) {
						user.wins += 1;
						user.save();
		
					}
		
				});
				RoomClear(room);

			}
			else if (room.black == session['username']) {
				console.log('White Wins!');
				data = {
					result: 'WHITE WINS'
		
				};
				// EMIT RESULT
				global.io.to(room.white).emit('RoomResult', data);
				global.io.to(room.black).emit('RoomResult', data);
				// MONGO DB SAVE
				UsersModel.findOne({username: room.white}, (error, user) => {
					if (!error) {
						user.wins += 1;
						user.save();
		
					}
		
				});
				UsersModel.findOne({username: room.black}, (error, user) => {
					if (!error) {
						user.losses += 1;
						user.save();
		
					}
		
				});
				RoomClear(room);

			}

		}
		

	}

	console.log('Room Resign Request');

}

module.exports = RoomResignController;

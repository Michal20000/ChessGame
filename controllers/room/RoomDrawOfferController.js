const ReturnSession = require('../../utilities/ReturnSession');
const Authorization = require('../../utilities/Authorization');
const InRoom = require('../../utilities/room/InRoom');
const RoomClear = require('../../utilities/room/RoomClear');
const UsersModel = require('../../models/UsersModel');

const RoomDrawOfferController = (socket, data) => {
	let hash = data.hash;
	let mainData = data.mainData;
	let session = ReturnSession(hash);
	
	if (Authorization(session)) { // && notInGame !IMPORTANT
		if (InRoom(session)) {
			let room = global.rooms.get(session['room']); // Only Bullet!
			if (room.white == session['username']) {
				room.whiteDraw = !room.whiteDraw;

			}
			else if (room.black == session['username']) {
				room.blackDraw = !room.blackDraw;

			}
			if (room.whiteDraw && room.blackDraw) {
				console.log('Draw!');
				data = {
					result: 'DRAW'
		
				};
				// EMIT RESULT
				global.io.to(room.white).emit('RoomResult', data);
				global.io.to(room.black).emit('RoomResult', data);
				// MONGO DB SAVE
				UsersModel.findOne({username: room.white}, (error, user) => {
					if (!error) {
						user.draws += 1;
						user.save();
		
					}
		
				});
				UsersModel.findOne({username: room.black}, (error, user) => {
					if (!error) {
						user.draws += 1;
						user.save();
		
					}
		
				});
				RoomClear(room);

			}

		}

	}

	console.log('Room Draw Offer Request');

}

module.exports = RoomDrawOfferController;

const RoomClear = require("./RoomClear");
const UsersModel = require('../../models/UsersModel');

const DRAW = 10;
const WHITE_WINS = 11;
const BLACK_WINS = 12;

const HandleRoom = (room, state) => {
	if (state == DRAW) {
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
	else if (state == WHITE_WINS) {
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
	else if (state == BLACK_WINS) {
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

}

module.exports = HandleRoom;

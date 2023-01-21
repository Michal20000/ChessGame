const ReturnSession = require("../ReturnSession");

const RoomClear = (room) => {
	room.white = '';
	room.black = '';
	global.rooms.delete(room.id);

}

module.exports = RoomClear;

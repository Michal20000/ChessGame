const InRoom = (session) => {
	let room = global.rooms.get(session['room']);
	if (room) {
		return !!session['room'] && room.running == true;

	}
	return false;

}

module.exports = InRoom;

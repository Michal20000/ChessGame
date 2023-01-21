const InRoom = (session) => {
	let room = global.rooms.get(session['room']);
	if (room) {
		console.log(room);
		return true;
		// return !!session['room'] && room.running == true;

	}
	return false;

}

module.exports = InRoom;

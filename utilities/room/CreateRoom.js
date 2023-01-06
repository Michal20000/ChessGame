const CreateRoom = (socket, session, duration) => {
	let id = session['username']
	let room = {
		id: id,
		running: false,
		whiteTime: duration,
		blackTime: duration,
		kind: GameKind(duration)

	};
	global.rooms.set(id, room);
	session['room'] = id;

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

module.exports = CreateRoom;

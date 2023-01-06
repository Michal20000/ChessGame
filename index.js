const HTTP = require('http');
const SocketServer = require('socket.io').Server;
const expressModule = require('express');
require('./models/Connection');
global.sessions = new Map(); // set!!!
global.rooms = new Map();
const application = expressModule();
const serverHTTP = HTTP.createServer(application);
const corsData = {
	cors: {
    origin: '*',
    methods: [
			'GET', 
			'POST'

		],
    allowedHeaders: [
			'MM'

		],
    credentials: true

  }

};
global.io = new SocketServer(serverHTTP, corsData);
const PORT = 3000;
const onListen = () => {
	console.log('Listening on PORT: ' + PORT);

}





const LoginController = require('./controllers/LoginController');
const RegisterController = require('./controllers/RegisterController');
const LogoutController = require('./controllers/LogoutController');
const ProfileController  = require('./controllers/ProfileController');

const RoomController = require('./controllers/room/RoomController');
const RoomMoveController = require('./controllers/room/RoomMoveController');
const RoomDrawOfferController = require('./controllers/room/RoomDrawOfferController');
const RoomResignController = require('./controllers/room/RoomResignController');

global.io.on('connection', (socket) => {
	console.log('Connection!');
	// if (Authorization(data))
	// let session = Session(data)
	// 	IF cookie exists on client and on main navigation bar THEN
	//		click LOGIN
	//		THEN
	//		server will check if session of that user exists
	// 	END IF
	// FIRST PLAYER CAN BE ROOM HASH
	// TIME WILL BE PASSING
	// FROM FIRST PERSON
	// FROM SECOND PERSON
	// IF IT GOES DOWN - YOU LOOSE

	// BULLET GAME - 1 MINUTE
	// BLITZ GAME - 5 MINUTES
	// RAPID GAME - 10 MINUTES
	// CLASSICAL GAME - 30 MINUTES
	
	socket.on('RegisterRequest', (data) => {
		RegisterController(socket, data);

	});
	socket.on('LoginRequest', (data) => {
		LoginController(socket, data);

	});
	socket.on('LogoutRequest', (data) => {
		LogoutController(socket, data);

	});

	socket.on('RoomRequest', (data) => {
		RoomController(socket, data);

	});
	socket.on('MoveRequest', (data) => {
		RoomMoveController(socket, data);

	});
	socket.on('DrawOfferRequest', (data) => {
		RoomDrawOfferController(socket, data);

	});
	socket.on('ResignRequest', (data) => {
		RoomResignController(socket, data);

	});
	socket.on('ProfileRequest', (data) => {
		ProfileController(socket, data);

	});
	socket.on('disconnect', () => {

	});

});
serverHTTP.listen(PORT, onListen);

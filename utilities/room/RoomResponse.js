const RoomResponse = (bulletRoom) => {
	let chessBoard = bulletRoom.chessEngine.ChessBoard();
	let responseDataWhite = {
		white: bulletRoom.white,
		black: bulletRoom.black,
		whiteTime: bulletRoom.whiteTime,
		blackTime: bulletRoom.blackTime,
		state: bulletRoom.chessEngine.gameState,
		pieces: chessBoard,
		color: 0

	}
	let responseDataBlack = {
		white: bulletRoom.white,
		black: bulletRoom.black,
		whiteTime: bulletRoom.whiteTime,
		blackTime: bulletRoom.blackTime,
		state: bulletRoom.chessEngine.gameState,
		pieces: chessBoard,
		color: 1

	}
	global.io.to(bulletRoom.white).emit('RoomResponse', responseDataWhite);
	global.io.to(bulletRoom.black).emit('RoomResponse', responseDataBlack);

}

module.exports = RoomResponse;

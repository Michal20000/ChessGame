const PAWN = 0;
const ROOK = 1;
const HORSE = 2;
const BISHOP = 3;
const QUEEN = 4;
const KING = 5;

const WHITE = 0;
const BLACK = 1;

const DRAW = 10;
const WHITE_WINS = 11;
const BLACK_WINS = 12;



const Piece = class {
	constructor(pieceColor, pieceClass, possibleMoves, row, column) {
		this.pieceColor = pieceColor;
		this.pieceClass = pieceClass;
		this.possibleMoves = possibleMoves;
		this.moveTime = -1;
		this.doubleMoveTime = -1;
		this.row = row;
		this.column = column;
		// !IMPORTANT - DOUBLE MOVE
		// !IMPORTANT - ROOK MOVE
		// idea: 0 doubleMoveTime -> if (moveTime{+0, +1} == moveCount{BETTER NAME}) -> Bicie w Locie
		// idea: 0 moveTime -> if (moveTime == 0) -> Rook Can Castle
		// idea: HasMove could be better!

	}
	IsWhite() {
		return this.pieceColor == WHITE;

	}
	IsBlack() {
		return this.pieceColor == BLACK;

	}
	IsEnemyOf(piece) {
		return this.pieceColor != piece.pieceColor;

	}
	IsPawn() {
		return this.pieceClass == PAWN;

	}
	IsRook() {
		return this.pieceClass == ROOK;
		
	}
	IsHorse() {
		return this.pieceClass == HORSE;
		
	}
	IsBishop() {
		return this.pieceClass == BISHOP;
		
	}
	IsQueen() {
		return this.pieceClass == QUEEN;
		
	}
	IsKing() {
		return this.pieceClass == KING;
		
	}

};
const Pawn = class extends Piece {
	constructor(pieceColor, row, column) {
		super(pieceColor, PAWN, PawnPossibleMoves, row, column);

	}

};
const Rook = class extends Piece {
	constructor(pieceColor, row, column) {
		super(pieceColor, ROOK, RookPossibleMoves, row, column);

	}
	
};
const Horse = class extends Piece {
	constructor(pieceColor, row, column) {
		super(pieceColor, HORSE, HorsePossibleMoves, row, column);

	}
	
};
const Bishop = class extends Piece {
	constructor(pieceColor, row, column) {
		super(pieceColor, BISHOP, BishopPossibleMoves, row, column);

	}
	
};
const Queen = class extends Piece {
	constructor(pieceColor, row, column) {
		super(pieceColor, QUEEN, QueenPossibleMoves, row, column);

	}
	
};
const King = class extends Piece {
	constructor(pieceColor, row, column) {
		super(pieceColor, KING, KingPossibleMoves, row, column);

	}
	IsKingInCheck(piecesList) {
		return !this.IsKingSave(piecesList, 0);

	}
	IsKingSave(piecesList, offsetRow = 0, offsetColumn = 0) {
		let pawnDirection = this.IsWhite() ? -1 : 1;
		let rows;
		let columns;
		let row = this.row + offsetRow;
		let column = this.column + offsetColumn;


		
		rows = [
			row + pawnDirection,
			row + pawnDirection

		];
		columns = [
			column - 1,
			column + 1

		];
		for (let i = 0; i < 2; ++i) {
			let iR = rows[i];
			let iC = columns[i];
			if (iR >= 0 && iR < 8 && iC >= 0 && iC < 8) {
				if (piecesList[iR][iC]) {
					if (piecesList[iR][iC].IsEnemyOf(this) && piecesList[iR][iC].IsPawn()) {
						return false;

					}

				}

			}

		}
		rows = [
			row + 2,
			row + 2,
			row + 1,
			row + 1,
			row - 1,
			row - 1,
			row - 2,
			row - 2
			
		];
		columns = [
			column + 1,
			column - 1,
			column + 2,
			column - 2,
			column + 2,
			column - 2,
			column + 1,
			column - 1
			
		];
		for (let i = 0; i < 8; ++i) {
			let iR = rows[i];
			let iC = columns[i];
			if (iR >= 0 && iR < 8 && iC >= 0 && iC < 8) {
				if (piecesList[iR][iC]) {
					if (piecesList[iR][iC].IsEnemyOf(this) && piecesList[iR][iC].IsHorse()) {
						return false;

					}

				}

			}

		}
		rows = [
			row + 1,
			row + 1,
			row + 1,
			row,
			row,
			row - 1,
			row - 1,
			row - 1
			
		];
		columns = [
			column + 1,
			column,
			column - 1,
			column + 1,
			column - 1,
			column + 1,
			column,
			column - 1
			
		];
		for (let i = 0; i < 8; ++i) {
			let iR = rows[i];
			let iC = columns[i];
			if (iR >= 0 && iR < 8 && iC >= 0 && iC < 8) {
				if (piecesList[iR][iC]) {
					if (piecesList[iR][iC].IsEnemyOf(this) && piecesList[iR][iC].IsKing()) {
						return false;

					}

				}

			}

		}


		
		for (let iC = column + 1; iC < 8; ++iC) {
			let iR = row;
			if (piecesList[iR][iC]) {
				if (piecesList[iR][iC].IsEnemyOf(this) && (piecesList[iR][iC].IsRook() || piecesList[iR][iC].IsQueen())) {
					return false;

				}
				else {
					break;

				}

			}

		}
		for (let iC = column - 1; iC >= 0; --iC) {
			let iR = row;
			if (piecesList[iR][iC]) {
				if (piecesList[iR][iC].IsEnemyOf(this) && (piecesList[iR][iC].IsRook() || piecesList[iR][iC].IsQueen())) {
					return false;

				}
				else {
					break;

				}

			}

		}
		for (let iR = row + 1; iR < 8; ++iR) {
			let iC = column;
			if (piecesList[iR][iC]) {
				if (piecesList[iR][iC].IsEnemyOf(this) && (piecesList[iR][iC].IsRook() || piecesList[iR][iC].IsQueen())) {
					return false;

				}
				else {
					break;

				}

			}

		}
		for (let iR = row - 1; iR >= 0; --iR) {
			let iC = column;
			if (piecesList[iR][iC]) {
				if (piecesList[iR][iC].IsEnemyOf(this) && (piecesList[iR][iC].IsRook() || piecesList[iR][iC].IsQueen())) {
					return false;

				}
				else {
					break;

				}

			}

		}
		

		
		for (let iR = row + 1, iC = column + 1; iR < 8 && iC < 8; ++iR, ++iC) {
			if (piecesList[iR][iC]) {
				if (piecesList[iR][iC].IsEnemyOf(this) && (piecesList[iR][iC].IsBishop() || piecesList[iR][iC].IsQueen())) {
					return false;

				}
				else {
					break;

				}

			}

		}
		for (let iR = row + 1, iC = column - 1; iR < 8 && iC >= 0; ++iR, --iC) {
			if (piecesList[iR][iC]) {
				if (piecesList[iR][iC].IsEnemyOf(this) && (piecesList[iR][iC].IsBishop() || piecesList[iR][iC].IsQueen())) {
					return false;

				}
				else {
					break;

				}

			}

		}
		for (let iR = row - 1, iC = column - 1; iR >= 0 && iC >= 0; --iR, --iC) {
			if (piecesList[iR][iC]) {
				if (piecesList[iR][iC].IsEnemyOf(this) && (piecesList[iR][iC].IsBishop() || piecesList[iR][iC].IsQueen())) {
					return false;

				}
				else {
					break;

				}

			}

		}
		for (let iR = row - 1, iC = column + 1; iR >= 0 && iC < 8; --iR, ++iC) {
			if (piecesList[iR][iC]) {
				if (piecesList[iR][iC].IsEnemyOf(this) && (piecesList[iR][iC].IsBishop() || piecesList[iR][iC].IsQueen())) {
					return false;

				}
				else {
					break;

				}

			}

		}
		return true;

	}
	IsLongCastle(piecesList) {
		let conditionX = this.IsKingSave(piecesList, 0, 0);
		piecesList[this.row][this.column] = null;
		piecesList[this.row][this.column - 1] = this;
		let conditionY = this.IsKingSave(piecesList, 0, -1);
		piecesList[this.row][this.column - 1] = null;
		piecesList[this.row][this.column - 2] = this;
		let conditionZ = this.IsKingSave(piecesList, 0, -2);
		return conditionX && conditionY && conditionZ;

	}
	IsShortCastle(piecesList) {
		let conditionX = this.IsKingSave(piecesList, 0, 0);
		piecesList[this.row][this.column] = null;
		piecesList[this.row][this.column + 1] = this;
		let conditionY = this.IsKingSave(piecesList, 0, 1);
		piecesList[this.row][this.column + 1] = null;
		piecesList[this.row][this.column + 2] = this;
		let conditionZ = this.IsKingSave(piecesList, 0, 2);
		return conditionX && conditionY && conditionZ;

	}
	
};
const Move = class {
	constructor(reference, row, column, procedure) {
		this.reference = reference;
		this.row = row;
		this.column = column;
		this.procedure = procedure;

	}

};



const ChessEngine = class {
  constructor() {
		this.possibleMoves = new Map();
		this.gameState = WHITE;
		this.currentMoveTime = 0;
		this.GeneratePieces();
		this.CalculatePossibleMoves(this.gameState);

  }
	ChangeState() {
		if (this.gameState == WHITE) {
			this.gameState = BLACK;
			this.CalculatePossibleMoves(this.gameState);
			if (this.possibleMoves.size == 0) {
				if (this.blackKing.IsKingSave(this.PiecesList()))
					return DRAW;
				else
					return WHITE_WINS;

			}
			return this.gameState;

		}
		else if (this.gameState == BLACK) {
			this.currentMoveTime += 1; // !IMPORTANT - BETTER NAME
			this.gameState = WHITE;
			this.CalculatePossibleMoves(this.gameState);
			if (this.possibleMoves.size == 0) {
				if (this.whiteKing.IsKingSave(this.PiecesList()))
					return DRAW;
				else
					return BLACK_WINS;

			}
			return this.gameState;

		}

	}
	Querry(querry) {
		let moves;
		if (moves = this.possibleMoves.get(this.MoveCodeQuerry(querry))) {
			console.log('ChessEngine: does contain');
			for (let move of moves) {
				this.pieces[move.row][move.column] = move.reference;
				if (move.reference) {
					move.reference.row = move.row;
					move.reference.column = move.column;
					if (move.procedure) {
						move.procedure.call(move.reference, this);

					}

				}

			}
			let state = this.ChangeState();
			return state;

		}
		console.log('ChessEngine: does not contain');
		return null;
		// return nullState or something like that.
		
		// 	QUERRY: {
		// 		FROM: {ROW: <0, 7>, COLUMN: <0, 7>},
		//		TO: {ROW: <0, 7>, COLUMN: <0, 7>},
		//		PROMOTION: <0, 7>
		//		
		// 	};
		// TODO: RETURN RESPONSE
		// RESPONSE: WHITE MOVE
		// RESPONSE: BLACK MOVE
		// RESPONSE: PAT
		// 

	}
	ChessBoard() {
		for (let iR = 0; iR < 8; ++iR) {
			for (let iC = 0; iC < 8; ++iC) {
				if (this.pieces[iR][iC]) {
					this.chessPieces[iR][iC] = this.pieces[iR][iC].IsWhite() ? this.pieces[iR][iC].pieceClass : this.pieces[iR][iC].pieceClass + 6;
					
				}
				else {
					this.chessPieces[iR][iC] = null;

				}

			}

		}
		return this.chessPieces;
		
	}
	GeneratePieces() {
		this.pieces = [
			[], [], [], [], 
			[], [], [], []

		];
		this.piecesList = [
			[], [], [], [], 
			[], [], [], []

		];
		this.chessPieces = [
			[], [], [], [], 
			[], [], [], []

		];
		for (let iR = 2; iR < 6; ++iR) {
			for (let iC = 0; iC < 8; ++iC) {
				this.pieces[iR][iC] = null;

			}

		}
		for (let iC = 0; iC < 8; ++iC) {
			this.pieces[6][iC] = new Pawn(WHITE, 6, iC);
			this.pieces[1][iC] = new Pawn(BLACK, 1, iC);

		}
		this.pieces[0][0] = new Rook(BLACK, 0, 0);
		this.pieces[0][1] = new Horse(BLACK, 0, 1);
		this.pieces[0][2] = new Bishop(BLACK, 0, 2);
		this.pieces[0][3] = new Queen(BLACK, 0, 3);
		this.pieces[0][4] = new King(BLACK, 0, 4);
		this.pieces[0][5] = new Bishop(BLACK, 0, 5);
		this.pieces[0][6] = new Horse(BLACK, 0, 6);
		this.pieces[0][7] = new Rook(BLACK, 0, 7);
		this.blackKing = this.pieces[0][4];
		
		this.pieces[7][0] = new Rook(WHITE, 7, 0);
		this.pieces[7][1] = new Horse(WHITE, 7, 1);
		this.pieces[7][2] = new Bishop(WHITE, 7, 2);
		this.pieces[7][3] = new Queen(WHITE, 7, 3);
		this.pieces[7][4] = new King(WHITE, 7, 4);
		this.pieces[7][5] = new Bishop(WHITE, 7, 5);
		this.pieces[7][6] = new Horse(WHITE, 7, 6);
		this.pieces[7][7] = new Rook(WHITE, 7, 7);
		this.whiteKing = this.pieces[7][4];

	}
	LoadPieces(data) {
		// GAME STATE
		console.log(data);

	}
	CalculatePossibleMoves(pieceColor) {
		this.possibleMoves.clear();
		for (let iR = 0; iR < 8; ++iR) {
			for (let iC = 0; iC < 8; ++iC) {
				if (this.pieces[iR][iC]) {
					if (this.pieces[iR][iC].pieceColor == pieceColor) {
						this.pieces[iR][iC].possibleMoves(this, iR, iC);
						
					}
					
				}
				
			}
			
		}

	}
	PiecesList() {
		for (let iR = 0; iR < 8; ++iR) {
			for (let iC = 0; iC < 8; ++iC) {
				this.piecesList[iR][iC] = this.pieces[iR][iC];

			}

		}
		return this.piecesList;

	}
	MoveCodeQuerry(move) {
		if (move.from.row >= 0 && move.from.row < 8 && move.from.column >= 0 && move.from.column < 8 && move.to.row >= 0 && move.to.row < 8 && move.to.column >= 0 && move.to.column < 8) {
			let fromRow = move.from.row << 12;
			let fromColumn = move.from.column << 9;
			let toRow = move.to.row << 6;
			let toColumn = move.to.column << 3;
			let promotion = move.promotion;
			return fromRow | fromColumn | toRow | toColumn | promotion;

		}
		return 0;

	}
	MoveCode(from, to, promotion) {
		let fromRow = from[0] << 12;
		let fromColumn = from[1] << 9;
		let toRow = to[0] << 6;
		let toColumn = to[1] << 3;
		return fromRow | fromColumn | toRow | toColumn | promotion;

	}
	KingOf(piece) {
		if (piece.pieceColor == WHITE) {
			return this.whiteKing;

		}
		else if (piece.pieceColor == BLACK) {
			return this.blackKing;

		}

	}

};



const PawnPossibleMoves = function(chessEngine, row, column) {
	let pawnDirection;
	let doubleMoveRow;
	let promotionRow;
	let enPassantRow;

	if (this.IsWhite()) {
		pawnDirection = -1;
		doubleMoveRow = 6;
		promotionRow = 1;
		enPassantRow = 3;

	}
	else {
		pawnDirection = 1;
		doubleMoveRow = 1;
		promotionRow = 6;
		enPassantRow = 4;

	}
	let rows = [
		row + pawnDirection,
		row + pawnDirection

	];
	let columns = [
		column - 1,
		column + 1

	];

	if (row == enPassantRow) {
		for (let i = 0; i < 2; ++i) {
			let iR = row;
			let iC = columns[i];
			if (iR >= 0 && iR < 8 && iC >= 0 && iC < 8) {
				let piece = chessEngine.pieces[iR][iC];
				if (piece) {
					if (piece.IsEnemyOf(this) && piece.IsPawn() && piece.doubleMoveTime + piece.IsBlack() == chessEngine.currentMoveTime) {
						let piecesList = chessEngine.PiecesList();
						piecesList[row][column] = null;
						piecesList[iR + pawnDirection][iC] = this;
						piecesList[iR][iC] = null;
						if (chessEngine.KingOf(this).IsKingSave(piecesList)) {
							let moveCode = chessEngine.MoveCode([row, column], [iR + pawnDirection, iC], 0);
							let move = [
								new Move(null, row, column, null),
								new Move(this, iR + pawnDirection, iC, null),
								new Move(null, iR, iC, null)
	
							];
							chessEngine.possibleMoves.set(moveCode, move);
	
						}
	
					}
	
				}
	
			}
	
		}

	}
	for (let i = 0; i < 2; ++i) {
		let iR = rows[i];
		let iC = columns[i];
		if (iR >= 0 && iR < 8 && iC >= 0 && iC < 8) {
			let piece = chessEngine.pieces[iR][iC];
			if (piece) {
				if (piece.IsEnemyOf(this)) {
					let piecesList = chessEngine.PiecesList();
					piecesList[row][column] = null;
					piecesList[iR][iC] = this;
					if (chessEngine.KingOf(this).IsKingSave(piecesList)) {
						if (row == promotionRow) {
							let moveCode = chessEngine.MoveCode([row, column], [iR, iC], 7);
							let move = [
								new Move(null, row, column, null),
								new Move(this, iR, iC, PromoteRookProcedure)

							];
							chessEngine.possibleMoves.set(moveCode, move);
							moveCode = chessEngine.MoveCode([row, column], [iR, iC], 6);
							move = [
								new Move(null, row, column, null),
								new Move(this, iR, iC, PromoteHorseProcedure)

							];
							chessEngine.possibleMoves.set(moveCode, move);
							moveCode = chessEngine.MoveCode([row, column], [iR, iC], 5);
							move = [
								new Move(null, row, column, null),
								new Move(this, iR, iC, PromoteBishopProcedure)

							];
							chessEngine.possibleMoves.set(moveCode, move);
							moveCode = chessEngine.MoveCode([row, column], [iR, iC], 4);
							move = [
								new Move(null, row, column, null),
								new Move(this, iR, iC, PromoteQueenProcedure)

							];
							chessEngine.possibleMoves.set(moveCode, move);

						}
						else {
							let moveCode = chessEngine.MoveCode([row, column], [iR, iC], 0);
							let move = [
								new Move(null, row, column, null),
								new Move(this, iR, iC, null)

							];
							chessEngine.possibleMoves.set(moveCode, move);
								
						}

					}

				}

			}

		}

	}
	let iR = row + pawnDirection;
	let iC = column;
	let piece = chessEngine.pieces[iR][iC];
	if (piece == null) {
		let piecesList = chessEngine.PiecesList();
		piecesList[row][column] = null;
		piecesList[iR][iC] = this;
		if (chessEngine.KingOf(this).IsKingSave(piecesList)) {
			if (row == promotionRow) {
				let moveCode = chessEngine.MoveCode([row, column], [iR, iC], 7);
				let move = [
					new Move(null, row, column, null),
					new Move(this, iR, iC, PromoteRookProcedure)

				];
				chessEngine.possibleMoves.set(moveCode, move);
				moveCode = chessEngine.MoveCode([row, column], [iR, iC], 6);
				move = [
					new Move(null, row, column, null),
					new Move(this, iR, iC, PromoteHorseProcedure)

				];
				chessEngine.possibleMoves.set(moveCode, move);
				moveCode = chessEngine.MoveCode([row, column], [iR, iC], 5);
				move = [
					new Move(null, row, column, null),
					new Move(this, iR, iC, PromoteBishopProcedure)

				];
				chessEngine.possibleMoves.set(moveCode, move);
				moveCode = chessEngine.MoveCode([row, column], [iR, iC], 4);
				move = [
					new Move(null, row, column, null),
					new Move(this, iR, iC, PromoteQueenProcedure)

				];
				chessEngine.possibleMoves.set(moveCode, move);

			}
			else {
				let moveCode = chessEngine.MoveCode([row, column], [iR, iC], 0);
				let move = [
					new Move(null, row, column, null),
					new Move(this, iR, iC, null)

				];
				chessEngine.possibleMoves.set(moveCode, move);

			}

		}
		if (row == doubleMoveRow) {
			let iR = row + (pawnDirection * 2);
			let iC = column;
			let piece = chessEngine.pieces[iR][iC];
			if (piece == null) {
				let piecesList = chessEngine.PiecesList();
				piecesList[row][column] = null;
				piecesList[iR][iC] = this;
				if (chessEngine.KingOf(this).IsKingSave(piecesList)) {
					let moveCode = chessEngine.MoveCode([row, column], [iR, iC], 0);
					let move = [
						new Move(null, row, column, null),
						new Move(this, iR, iC, DoubleMoveProcedure)

					];
					chessEngine.possibleMoves.set(moveCode, move);

				}

			}

		}

	}

}
const RookPossibleMoves = function(chessEngine, row, column) {
	let iR = row;
	for (let iC = column + 1; iC < 8; ++iC) {
		let piece = chessEngine.pieces[iR][iC];
		if (piece) {
			if (piece.IsEnemyOf(this)) {
				let piecesList = chessEngine.PiecesList();
				piecesList[row][column] = null;
				piecesList[iR][iC] = this;
				if (chessEngine.KingOf(this).IsKingSave(piecesList, 0)) {
					let moveCode = chessEngine.MoveCode([row, column], [iR, iC], 0);
					let move = [
						new Move(null, row, column, null),
						new Move(this, iR, iC, UpdateMoveProcedure)

					];
					chessEngine.possibleMoves.set(moveCode, move);

				}
				break;

			}
			else {
				break;

			}

		}
		else {
			let piecesList = chessEngine.PiecesList();
			piecesList[row][column] = null;
			piecesList[iR][iC] = this;
			if (chessEngine.KingOf(this).IsKingSave(piecesList, 0)) {
				let moveCode = chessEngine.MoveCode([row, column], [iR, iC], 0);
				let move = [
					new Move(null, row, column, null),
					new Move(this, iR, iC, UpdateMoveProcedure)

				];
				chessEngine.possibleMoves.set(moveCode, move);

			}

		}

	}
	for (let iC = column - 1; iC >= 0; --iC) {
		let piece = chessEngine.pieces[iR][iC];
		if (piece) {
			if (piece.IsEnemyOf(this)) {
				let piecesList = chessEngine.PiecesList();
				piecesList[row][column] = null;
				piecesList[iR][iC] = this;
				if (chessEngine.KingOf(this).IsKingSave(piecesList, 0)) {
					let moveCode = chessEngine.MoveCode([row, column], [iR, iC], 0);
					let move = [
						new Move(null, row, column, null),
						new Move(this, iR, iC, UpdateMoveProcedure)

					];
					chessEngine.possibleMoves.set(moveCode, move);

				}
				break;

			}
			else {
				break;

			}

		}
		else {
			let piecesList = chessEngine.PiecesList();
			piecesList[row][column] = null;
			piecesList[iR][iC] = this;
			if (chessEngine.KingOf(this).IsKingSave(piecesList, 0)) {
				let moveCode = chessEngine.MoveCode([row, column], [iR, iC], 0);
				let move = [
					new Move(null, row, column, null),
					new Move(this, iR, iC, UpdateMoveProcedure)

				];
				chessEngine.possibleMoves.set(moveCode, move);

			}

		}

	}
	let iC = column;
	for (let iR = row + 1; iR < 8; ++iR) {
		let piece = chessEngine.pieces[iR][iC];
		if (piece) {
			if (piece.IsEnemyOf(this)) {
				let piecesList = chessEngine.PiecesList();
				piecesList[row][column] = null;
				piecesList[iR][iC] = this;
				if (chessEngine.KingOf(this).IsKingSave(piecesList, 0)) {
					let moveCode = chessEngine.MoveCode([row, column], [iR, iC], 0);
					let move = [
						new Move(null, row, column, null),
						new Move(this, iR, iC, UpdateMoveProcedure)

					];
					chessEngine.possibleMoves.set(moveCode, move);

				}
				break;

			}
			else {
				break;

			}

		}
		else {
			let piecesList = chessEngine.PiecesList();
			piecesList[row][column] = null;
			piecesList[iR][iC] = this;
			if (chessEngine.KingOf(this).IsKingSave(piecesList, 0)) {
				let moveCode = chessEngine.MoveCode([row, column], [iR, iC], 0);
				let move = [
					new Move(null, row, column, null),
					new Move(this, iR, iC, UpdateMoveProcedure)

				];
				chessEngine.possibleMoves.set(moveCode, move);

			}

		}

	}
	for (let iR = row - 1; iR >= 0; --iR) {
		let piece = chessEngine.pieces[iR][iC];
		if (piece) {
			if (piece.IsEnemyOf(this)) {
				let piecesList = chessEngine.PiecesList();
				piecesList[row][column] = null;
				piecesList[iR][iC] = this;
				if (chessEngine.KingOf(this).IsKingSave(piecesList, 0)) {
					let moveCode = chessEngine.MoveCode([row, column], [iR, iC], 0);
					let move = [
						new Move(null, row, column, null),
						new Move(this, iR, iC, UpdateMoveProcedure)

					];
					chessEngine.possibleMoves.set(moveCode, move);

				}
				break;

			}
			else {
				break;

			}

		}
		else {
			let piecesList = chessEngine.PiecesList();
			piecesList[row][column] = null;
			piecesList[iR][iC] = this;
			if (chessEngine.KingOf(this).IsKingSave(piecesList, 0)) {
				let moveCode = chessEngine.MoveCode([row, column], [iR, iC], 0);
				let move = [
					new Move(null, row, column, null),
					new Move(this, iR, iC, UpdateMoveProcedure)

				];
				chessEngine.possibleMoves.set(moveCode, move);

			}

		}

	}
	
}
const HorsePossibleMoves = function(chessEngine, row, column) {
	let rows = [
		row + 2,
		row + 2,
		row + 1,
		row + 1,
		row - 1,
		row - 1,
		row - 2,
		row - 2
		
	];
	let columns = [
		column + 1,
		column - 1,
		column + 2,
		column - 2,
		column + 2,
		column - 2,
		column + 1,
		column - 1
		
	];
	for (let i = 0; i < 8; ++i)
	{
		let iR = rows[i];
		let iC = columns[i];
		if (iR >= 0 && iR < 8 && iC >= 0 && iC < 8) {
			let piece = chessEngine.pieces[iR][iC];
			if (piece) {
				if (piece.IsEnemyOf(this)) {
					let piecesList = chessEngine.PiecesList();
					piecesList[row][column] = null;
					piecesList[iR][iC] = this;
					if (chessEngine.KingOf(this).IsKingSave(piecesList, 0)) {
						let moveCode = chessEngine.MoveCode([row, column], [iR, iC], 0);
						let move = [
							new Move(null, row, column, null),
							new Move(this, iR, iC, null)

						];
						chessEngine.possibleMoves.set(moveCode, move);

					}

				}

			}
			else {
				let piecesList = chessEngine.PiecesList();
				piecesList[row][column] = null;
				piecesList[iR][iC] = this;
				if (chessEngine.KingOf(this).IsKingSave(piecesList, 0)) {
					let moveCode = chessEngine.MoveCode([row, column], [iR, iC], 0);
					let move = [
						new Move(null, row, column, null),
						new Move(this, iR, iC, null)

					];
					chessEngine.possibleMoves.set(moveCode, move);

				}

			}
			
		}
		
	}
	
}
const BishopPossibleMoves = function(chessEngine, row, column) {
	for (let iR = row + 1, iC = column + 1; iR < 8 && iC < 8; ++iR, ++iC) {
		let piece = chessEngine.pieces[iR][iC];
		if (piece) {
			if (piece.IsEnemyOf(this)) {
				let piecesList = chessEngine.PiecesList();
				piecesList[row][column] = null;
				piecesList[iR][iC] = this;
				if (chessEngine.KingOf(this).IsKingSave(piecesList, 0)) {
					let moveCode = chessEngine.MoveCode([row, column], [iR, iC], 0);
					let move = [
						new Move(null, row, column, null),
						new Move(this, iR, iC, null)

					];
					chessEngine.possibleMoves.set(moveCode, move);

				}
				break;

			}
			else {
				break;

			}

		}
		else {
			let piecesList = chessEngine.PiecesList();
			piecesList[row][column] = null;
			piecesList[iR][iC] = this;
			if (chessEngine.KingOf(this).IsKingSave(piecesList, 0)) {
				let moveCode = chessEngine.MoveCode([row, column], [iR, iC], 0);
				let move = [
					new Move(null, row, column, null),
					new Move(this, iR, iC, null)

				];
				chessEngine.possibleMoves.set(moveCode, move);

			}

		}

	}
	for (let iR = row + 1, iC = column - 1; iR < 8 && iC >= 0; ++iR, --iC) {
		let piece = chessEngine.pieces[iR][iC];
		if (piece) {
			if (piece.IsEnemyOf(this)) {
				let piecesList = chessEngine.PiecesList();
				piecesList[row][column] = null;
				piecesList[iR][iC] = this;
				if (chessEngine.KingOf(this).IsKingSave(piecesList, 0)) {
					let moveCode = chessEngine.MoveCode([row, column], [iR, iC], 0);
					let move = [
						new Move(null, row, column, null),
						new Move(this, iR, iC, null)

					];
					chessEngine.possibleMoves.set(moveCode, move);

				}
				break;

			}
			else {
				break;

			}

		}
		else {
			let piecesList = chessEngine.PiecesList();
			piecesList[row][column] = null;
			piecesList[iR][iC] = this;
			if (chessEngine.KingOf(this).IsKingSave(piecesList, 0)) {
				let moveCode = chessEngine.MoveCode([row, column], [iR, iC], 0);
				let move = [
					new Move(null, row, column, null),
					new Move(this, iR, iC, null)

				];
				chessEngine.possibleMoves.set(moveCode, move);

			}

		}

	}
	for (let iR = row - 1, iC = column - 1; iR >= 0 && iC >= 0; --iR, --iC) {
		let piece = chessEngine.pieces[iR][iC];
		if (piece) {
			if (piece.IsEnemyOf(this)) {
				let piecesList = chessEngine.PiecesList();
				piecesList[row][column] = null;
				piecesList[iR][iC] = this;
				if (chessEngine.KingOf(this).IsKingSave(piecesList, 0)) {
					let moveCode = chessEngine.MoveCode([row, column], [iR, iC], 0);
					let move = [
						new Move(null, row, column, null),
						new Move(this, iR, iC, null)

					];
					chessEngine.possibleMoves.set(moveCode, move);

				}
				break;

			}
			else {
				break;

			}

		}
		else {
			let piecesList = chessEngine.PiecesList();
			piecesList[row][column] = null;
			piecesList[iR][iC] = this;
			if (chessEngine.KingOf(this).IsKingSave(piecesList, 0)) {
				let moveCode = chessEngine.MoveCode([row, column], [iR, iC], 0);
				let move = [
					new Move(null, row, column, null),
					new Move(this, iR, iC, null)

				];
				chessEngine.possibleMoves.set(moveCode, move);

			}

		}
		
	}
	for (let iR = row - 1, iC = column + 1; iR >= 0 && iC < 8; --iR, ++iC) {
		let piece = chessEngine.pieces[iR][iC];
		if (piece) {
			if (piece.IsEnemyOf(this)) {
				let piecesList = chessEngine.PiecesList();
				piecesList[row][column] = null;
				piecesList[iR][iC] = this;
				if (chessEngine.KingOf(this).IsKingSave(piecesList, 0)) {
					let moveCode = chessEngine.MoveCode([row, column], [iR, iC], 0);
					let move = [
						new Move(null, row, column, null),
						new Move(this, iR, iC, null)

					];
					chessEngine.possibleMoves.set(moveCode, move);

				}
				break;

			}
			else {
				break;

			}

		}
		else {
			let piecesList = chessEngine.PiecesList();
			piecesList[row][column] = null;
			piecesList[iR][iC] = this;
			if (chessEngine.KingOf(this).IsKingSave(piecesList, 0)) {
				let moveCode = chessEngine.MoveCode([row, column], [iR, iC], 0);
				let move = [
					new Move(null, row, column, null),
					new Move(this, iR, iC, null)

				];
				chessEngine.possibleMoves.set(moveCode, move);

			}

		}
		
	}
	
}
const QueenPossibleMoves = function(chessEngine, row, column) {
	RookPossibleMoves.call(this, chessEngine, row, column);
	BishopPossibleMoves.call(this, chessEngine, row, column);
	
}
const KingPossibleMoves = function(chessEngine, row, column) {
	let rows = [
		+1,
		+1,
		+1,
		0,
		0,
		-1,
		-1,
		-1
		
	];
	let columns = [
		+1,
		0,
		-1,
		+1,
		-1,
		+1,
		0,
		-1
		
	];
	// IsKingSaveError() !IMPORTANT

	for (let i = 0; i < 8; ++i)
	{
		let iR = row + rows[i];
		let iC = column + columns[i];
		if (iR >= 0 && iR < 8 && iC >= 0 && iC < 8)
		{
			let piece = chessEngine.pieces[iR][iC];
			if (piece) {
				if (piece.IsEnemyOf(this)) {
					let piecesList = chessEngine.PiecesList();
					piecesList[row][column] = null;
					piecesList[iR][iC] = this;
					if (chessEngine.KingOf(this).IsKingSave(piecesList, rows[i], columns[i])) {
						let moveCode = chessEngine.MoveCode([row, column], [iR, iC], 0);
						let move = [
							new Move(null, row, column, null),
							new Move(this, iR, iC, UpdateMoveProcedure)

						];
						chessEngine.possibleMoves.set(moveCode, move);

					}

				}

			}
			else {
				let piecesList = chessEngine.PiecesList();
				piecesList[row][column] = null;
				piecesList[iR][iC] = this;
				if (chessEngine.KingOf(this).IsKingSave(piecesList, rows[i], columns[i])) {
					let moveCode = chessEngine.MoveCode([row, column], [iR, iC], 0);
					let move = [
						new Move(null, row, column, null),
						new Move(this, iR, iC, UpdateMoveProcedure)

					];
					chessEngine.possibleMoves.set(moveCode, move);

				}

			}
			
		}
		
	}
	if (this.moveTime == -1) {
		if (chessEngine.pieces[row][column - 1] == null && chessEngine.pieces[row][column - 2] == null && chessEngine.pieces[row][column - 3] == null) {
			let piece = chessEngine.pieces[row][column - 4];
			if (piece) {
				if (piece.moveTime == -1 && piece.IsRook()) {
					let piecesList = chessEngine.PiecesList();
					if (this.IsLongCastle(piecesList)) {
						let moveCode = chessEngine.MoveCode([row, column], [row, column - 2], 0);
						let move = [
							new Move(null, row, column, null),
							new Move(this, row, column - 2, UpdateMoveProcedure),
							new Move(null, row, column - 4, null),
							new Move(piece, row, column - 1, UpdateMoveProcedure)
							// ROOK FROM
							// ROOK TO
	
						];
						chessEngine.possibleMoves.set(moveCode, move);

					}

				}
				
			}

		}
		if (chessEngine.pieces[row][column + 1] == null && chessEngine.pieces[row][column + 2] == null) {
			let piece = chessEngine.pieces[row][column + 3];
			if (piece) {
				if (piece.moveTime == -1 && piece.IsRook()) {
					let piecesList = chessEngine.PiecesList();
					if (this.IsShortCastle(piecesList)) {
						let moveCode = chessEngine.MoveCode([row, column], [row, column + 2], 0);
						let move = [
							new Move(null, row, column, null),
							new Move(this, row, column + 2, UpdateMoveProcedure),
							new Move(null, row, column + 3, null),
							new Move(piece, row, column + 1, UpdateMoveProcedure)
							// ROOK FROM
							// ROOK TO
	
						];
						chessEngine.possibleMoves.set(moveCode, move);

					}

				}

			}

		}

	}
	// !IMPORTANT - the hardest move in C++ implementation
	// Castling
	// IF rook.moveTime == -1 && this.moveTime == -1
	// IF {
		// IsKingSave()
		// IsKingSave() && null here
		// IsKingSave() && null here
		// in case of LEFT CASTLE && null here
		// in three positions - !IMPORTANT
	// }
	// LEFT CASTLE
	// RIGHT CASTLE
	
}



const UpdateMoveProcedure = function(chessEngine) {
	// !IMPORTANT - add them to possible moves
	// this is piece
	// this will handle move - that will come handy in case of castling
	// for rook - a name could be better
	// for king also because it also can not move!
	this.moveTime = chessEngine.currentMoveTime;

}
const DoubleMoveProcedure = function(chessEngine) {
	// this is piece
	// this will handle double move information
	// for pawns
	this.doubleMoveTime = chessEngine.currentMoveTime;

}
const PromoteRookProcedure = function(chessEngine) {
	// this is piece
	// that will handle the promotion
	// for pawns
	this.pieceClass = ROOK;
	this.possibleMoves = RookPossibleMoves;

}
const PromoteHorseProcedure = function(chessEngine) {
	// this is piece
	// that will handle the promotion
	// for pawns
	this.pieceClass = HORSE;
	this.possibleMoves = HorsePossibleMoves;

}
const PromoteBishopProcedure = function(chessEngine) {
	// this is piece
	// that will handle the promotion
	// for pawns
	this.pieceClass = BISHOP;
	this.possibleMoves = BishopPossibleMoves;

}
const PromoteQueenProcedure = function(chessEngine) {
	// this is piece
	// that will handle the promotion
	// for pawns
	this.pieceClass = QUEEN;
	this.possibleMoves = QueenPossibleMoves;

}



module.exports = ChessEngine;

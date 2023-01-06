const ReturnSession = (hash) => {
	if (global.sessions[hash]) {
		return global.sessions[hash];

	}
	else if (hash) {
		global.sessions[hash] = new Map();
		return global.sessions[hash];

	}

}

module.exports = ReturnSession;

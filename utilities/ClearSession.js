const ClearSession = (hash) => {
	if (global.sessions[hash]) {
		delete global.sessions[hash];

	}

}

module.exports = ClearSession;

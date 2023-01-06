const Authorization = (session) => {
	if (session['username'] && session['email'])
		return true;
	return false;

}

module.exports = Authorization;

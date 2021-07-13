//JSONWEB TOKEN:
const jwt = require('jsonwebtoken');

// GLOBAL VARIABLE ACCCESS
const config = require('config');

module.exports = (req, res, next) => {
	// FOR REQUESTING TOKEN INSERT IN HEADER
	const token = req.header('auth-token');

	// NOT PASSING TOKEN
	if (!token) {
		return res.status(401).json({ msg: 'NO TOKEN, Authorization denied' });
	}

	try {
		// VERIFY TOKEN
		const decoded = jwt.verify(token, config.get('noob'));

		
		// ACCESS USER DATA
		req.user = decoded.user;

		next();

	} catch (err) {
		console.error(err.message);
		res.status(401).json({ msg: 'Token is not valid' });
	}
};

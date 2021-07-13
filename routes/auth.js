const express = require('express');
// ROUTER
const router = express.Router();

// HASH PASSWORD GENERATOR
const bcrypt = require('bcryptjs');
// GLOBAL VARIABLE
const config = require('config');

// EXPRESS VALIDATOR
const { check, validationResult } = require('express-validator');

// JSON WEB TOKEN
const jwt = require('jsonwebtoken');

// MIDDLEWARE
const auth = require('../middlewares/auth');

// MODELS
const User = require('../models/User');

// GET METHOD
// PRIVATE
router.get('/', auth, async (req, res) => {
	try {
		// FIND USER BY TOKEN ID
		const getUser = await User.findById(req.user.id).select('-password');

		res.json(getUser);
		
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server error');
	}
});

// @route POST api/users
// @desc Register a user
// @access Public
router.post(
	'/',
	[
		check('email', 'Please enter valid email').notEmpty(),
		check('password', 'Please enter valid password ').isLength({ min: 6 }),
	],
	async (req, res) => {
		// extract errors
		const errors = validationResult(req);

		// if error is exist give error msg
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// extract from req body
		const { email, password } = req.body;

		try {
			// Search user from register users
			let user = await User.findOne({ email });

			// User not exist
			if (!user) {
				return res.status(400).json({ msg: 'user not found' });
			}

			// Compare user pass with req pass
			const isMatch = await bcrypt.compare(password, user.password);

			//  user pass not match
			if (!isMatch) {
				return res.status(400).json({ msg: 'user not found' });
			}

			// pull user id and from user and convert into payload
			const payload = {
				user: {
					id: user.id,
				}
			};

			jwt.sign(payload, config.get('noob'), (err, token) => {
				// if not errror send token
				res.json({ token });

				// if any token error
				if (err) throw err;
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;

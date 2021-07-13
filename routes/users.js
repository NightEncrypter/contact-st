const express = require('express');

// BS:
const bcrypt = require('bcryptjs');

// For globally access
const config = require('config');

// For webtokens
const jwt = require('jsonwebtoken');

// For validation purpose
const { check, validationResult } = require('express-validator');
const router = express.Router();

// this will use in route
const User = require('../models/User');

// POST METHOD
// PUBLIC
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Please with 6 or more character').isLength({ min: 6 }),
	],
	async (req, res) => {
		// const myValidationResult = validationResult.withDefaults({
		// 	formatter: error=>{
		// 		return {
		// 			myLocation: error.location,
		// 		};
		// 	}
		// })

		// const errors = myValidationResult(req).array();
		// Extract validation errors from a request and makes them available in a Result object
		const errors = validationResult(req);

		// console.log(errors);

		// Checking for error or not
		// const hasErrors = !errors.isEmpty();
		// console.log(hasErrors);

		// THESE NOT ERRORS IS EMPTY MEANS ERRORS ARE EXIST
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;
		try {
			// Find user by email
			let user = await User.findOne({ email });

			// IF ANY USER EXIST OF THAT EMAIL ID
			if (user) {
				return res.status(400).json({ msg: 'user already exist' });
			}
			// IF USER NOT EXIST CREATE NEW USER
			user = new User({
				name,
				email,
				password,
			});

			// ENCODED PASS BY HASH PASSWORD
			const salt = await bcrypt.genSalt();

			//REGISTER PASS ENCODING
			user.password = await bcrypt.hash(password, salt);

			// SAVE USER IN DATABASE
			await user.save();

			// THESE WILL BE USE TO ACCESS THE DATA IN CLOUD SERVER
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(payload, config.get('noob'), (err, token) => {
				if (err) throw err;

				res.json({ token: token });
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
			// process.exit(1);
		}
		// res.send('passed');

		// res.send(req.body);
	}
);

module.exports = router;

const express = require('express');

const router = express.Router();

//  VALIDATOR  CHECKER
const { check, validationResult } = require('express-validator');

// MODELS
const User = require('../models/User');
const Contact = require('../models/Contact');

// MIDDLEWARE
const auth = require('../middlewares/auth');
// CONTACT MODEL

// const collect=[];

// Add auth for protect the routes

// GET PRIVATE ROUTE
router.get('/', auth, async (req, res) => {
	try {
		// Find
		const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });

		// success
		res.json(contacts);
	} catch (e) {
		console.error(e.message);
		res.status(500).send('Server Error');
	}
});

// POST METHOD:
// ALL PRIVATE
router.post(
	'/',
	[
		auth,
		[
			check('name', 'Name is required').notEmpty(),
			check('phone', 'Number is required').notEmpty().isLength({ min: 10 }),
		],
	],
	async (req, res) => {
		// EXTRACT VALIDATION ERRRORS
		const errors = validationResult(req);

		// CHECKING IF ERRORS ARE EXIST
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors });
		}

		// DESTRUCTURING
		const { name, email, phone, type } = req.body;

		try {
			// ADD CONTACT FIELD
			const newContact = new Contact({
				name,
				phone,
				email,
				type,
				user: req.user.id,
			});

			const contact = await newContact.save();

			// Success
			res.json(contact);
		} catch (e) {
			console.error(e.message);
			res.status(500).send('Server Error');
		}
	}
);

router.put('/:id', auth, async (req, res) => {
	// res.send('UPDATE CONTACT')

	// if we submmitted the update request of anyone like name,email,phone,name
	const { email, phone, name, type } = req.body;

	//Intialise an Object
	const quackField = {};

	// Build contact object
	if (email) quackField.email = email;
	if (phone) quackField.phone = phone;
	if (name) quackField.name = name;
	if (type) quackField.type = type;

	try {
		// Search in contacts models by findId()
		let contact = await Contact.findById(req.params.id);
		// const user = await Contact.findOne({ id: req.user.id });

		// When contact id not found
		if (!contact) {
			return res.status(404).json({ msg: 'contact not found' });
		}

		// CONDITION for user update their own contact
		// Check the Token user id of login user present in Users models and User id present in contact model are same or not
		// we need to make sure that the user owns the contact
		// We dont want some one else contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'user not authorised' });
		}

       contact = await Contact.findByIdAndUpdate(req.params.id, { $set: quackField }, { new: true });

		res.json(contact);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

router.delete('/:id', auth, async (req, res) => {
	try {
		let contact = await Contact.findById(req.params.id);

		// if contact data set not found
		if (!contact) return res.status(401).json({ msg: 'not authorized' });

		// Checking update owns data or not
		if (contact.user.toString() !== req.user.id) return res.status(400).json({ msg: 'user not authorised' });

		await Contact.findByIdAndRemove(req.params.id);

		// Response of succeffully
		res.json({ msg: 'Deleted successfully' });

	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
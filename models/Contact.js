const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
	// CREATE RELLATION B/W CONTACTS AND USER
	// USERS HAS OWN SET OF CONTACTS
	user: {
		type: mongoose.Schema.Types.ObjectID,

		// this does tell relation b/w with  contacts and users collections
		ref: 'users',
	},
	name: {
		type: String,
	},
	email: {
		type: String,
	},
	type: {
		type: String,
		default: 'personal',
	},
	phone: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('contact', contactSchema);

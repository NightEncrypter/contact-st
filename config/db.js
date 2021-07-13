const mongoose = require('mongoose');

const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});
		console.log('Mongo connected.....');
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}

	// .then(() => console.log('mongodb connected'))
};
module.exports = connectDB;

import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
	mongoose.set('strictQuery', true);

	// If the database is already connected, don't connect again
	if (connected) {
		console.log('MongoDB Already Connected..');
		return;
	}

	// Connect to MongoDB
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		connected = true;
		console.log('MongoDB connected...');
	} catch (error) {
		console.log(error);
	}
};

export default connectDB;

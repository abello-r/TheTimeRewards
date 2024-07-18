// Dependencies:
import { connectToMongoDB } from './database/mongodb.js';

const mongoConnection = async (collectionName) => {
	try {
		const client = await connectToMongoDB();
		const database = client.db("the-time-rewards");
		return database.collection(collectionName);
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
		throw new Error('Database connection failed');
	}
};

const addUser = async (userData) => {
	try {
		const collection = await mongoConnection("users");
		const existingUser = await collection.findOne({ user_id: userData.id });
		if (existingUser) {
			console.log("User already exists");
			return 'User already exists';
		}
		await collection.insertOne({
			user_id: userData.id,
			given_name: userData.given_name,
			family_name: userData.family_name,
			email: userData.email,
			picture: userData.picture,
			createdAt: new Date(),
		});
		console.log("User added successfully");
		return 'User added successfully';
	} catch (error) {
		console.error('Error adding user:', error);
		throw new Error('Failed to add user');
	}
};

const getUsers = async () => {
	try {
		const collection = await mongoConnection("users");
		const users = await collection.find({}).toArray();
		if (users.length === 0) {
			console.log("No users found");
			return [];
		}
		return users;
	} catch (error) {
		console.error('Error retrieving users:', error);
		throw new Error('Failed to get users');
	}
};

const getUser = async (user_id) => {
	try {
		const collection = await mongoConnection("users");
		const user = await collection().findOne({ user_id });
		if (!user) {
			console.log("User not found");
			return 'User not found';
		}
		return user;
	} catch (error) {
		console.error('Error retrieving user:', error);
		throw new Error('Failed to get user');
	}
};


export default {
	addUser,
	getUsers,
	getUser,
};

// Dependencies:
import { MongoClient, ServerApiVersion } from 'mongodb';

// ${process.env.DB_PASS} 8DL1CVw263EyGZ1k
const uri = "mongodb+srv://abellor:8DL1CVw263EyGZ1k@thetimerewards.hhcbdoi.mongodb.net/?retryWrites=true&w=majority&appName=TheTimeRewards";

async function connectToMongoDB() {
	const client = new MongoClient(uri, {
		serverApi: {
			version: ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true,
		}
	});
	try {
		await client.connect();
		await client.db("admin").command({ ping: 1 });
		return client;
	} catch (error) {
		console.error("Failed to connect to MongoDB", error);
		throw error;
	}
}

export { connectToMongoDB };

// Dependencies:
import cors from 'cors';
import express from 'express';
import routes from './router.js';

const app = express()

// Configura CORS
app.use(cors({
	origin: '*',
	credentials: true,
	allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Parse the body of the request:
app.use(express.json());

// Use the routes
app.use('/', routes);

const PORT = 3001;

// Listen
app.listen(PORT);

// Print
console.log('The server is running on port', PORT);

// Export the app
export default app;

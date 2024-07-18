// Dependencies:
import express from 'express';
import rateLimit from 'express-rate-limit';
import Controller from './controller.js';

const router = express.Router();

// Rate limiter configuration
const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 200,
	message: 'Too many requests, please try again later.',
	keyGenerator: (req) => req.ip
});

// Root route
router.get('/', (req, res) => {
	res.send('Hello, what are you looking for?');
});

// Test route
router.get('/test', (req, res) => {
	console.log('Ping!');
	res.send('Ping!');
});

// Route handlers
const handleAsync = (fn) => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/users', limiter, handleAsync(async (req, res) => {
	const users = await Controller.getUsers();
	if (!users.length) {
		return res.status(404).send('No users found');
	}
	res.json(users);
}));

router.get('/users/:user_id', limiter, handleAsync(async (req, res) => {
	const { user_id } = req.params;
	const user = await Controller.getUserById(user_id);
	if (!user.length) {
		return res.status(404).send('No user found');
	}
	res.json(user);
}));

router.post('/users/add', limiter, handleAsync(async (req, res) => {
	const user = req.body;
	if (!user) {
		return res.status(400).send('User data is required');
	}
	const result = await Controller.addUser(user);
	res.send(result);
}));

// Error handling middleware
router.use((err, req, res, next) => {
	console.error(err);
	res.status(500).send('Internal Server Error');
});

export default router;

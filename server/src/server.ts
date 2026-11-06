import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from './generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';

const app = express();

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL!
});

const prisma = new PrismaClient({ adapter });

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.use(helmet());
app.use(express.json({ limit: '10kb' }));

const submissionLimiter = rateLimit({
	windowMs: 60 * 1000,
	limit: 1,
	standardHeaders: 'draft-8',
	legacyHeaders: false,
	message: { error: 'Please wait 60 seconds before posting again.' }
});

const validString = (value: unknown, max: number) =>
	typeof value === 'string' &&
	value.trim().length > 0 &&
	value.trim().length <= max;

app.get('/api/entries', async (req, res) => {
	try {
		const entries = await prisma.entry.findMany({
			orderBy: { username: 'asc' }
		});
		const formattedEntries = entries.map(entry => ({
			...entry,
			soberSince: entry.soberSince.toISOString().slice(0, 10)
		}));
		res.json(formattedEntries);
	} catch {
		res.status(500).json({ error: 'Failed to fetch entries' });
	}
});

app.post('/api/entries', submissionLimiter, async (req, res) => {
	try {
		const { username, soberSince, location, message } = req.body;
		if (
			!validString(username, 25) ||
			!validString(message, 185) ||
			(location != null && location !== '' && !validString(location, 30))
		) {
			return res.status(400).json({ error: 'Invalid entry' });
		}
		const date = new Date(`${soberSince}T00:00:00.000Z`);
		if (
			!/^\d{4}-\d{2}-\d{2}$/.test(soberSince) ||
			Number.isNaN(date.getTime()) ||
			date.toISOString().slice(0, 10) !== soberSince ||
			soberSince > new Date().toISOString().slice(0, 10)
		) {
			return res.status(400).json({ error: 'Invalid sobriety date' });
		}
		const newEntry = {
			username: username.trim(),
			soberSince: date,
			location: location?.trim() || null,
			message: message.trim()
		};
		const entry = await prisma.entry.create({ data: newEntry });
		res.status(201).json({
			...entry,
			soberSince: entry.soberSince.toISOString().slice(0, 10)
		});
	} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Failed to create entry' });
	}
})

app.listen(3000, () => {
	console.log('Server running on port 3000');
});
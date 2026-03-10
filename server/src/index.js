import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDb } from './db.js';
import { healthRouter } from './routes/health.js';
import { authRouter } from './routes/auth.js';
import { booksRouter } from './routes/books.js';
import { reviewsRouter } from './routes/reviews.js';
import { contactRouter } from './routes/contact.js';
import { User } from './models/User.js';
import jwt from 'jsonwebtoken';

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/e_library';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://127.0.0.1:5173';

const app = express();
app.use(cors({ origin: CORS_ORIGIN, credentials: false }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

// Attach req.user if Bearer is present (best-effort)
app.use(async (req, res, next) => {
  const header = req.headers.authorization || '';
  const [type, token] = header.split(' ');
  if (type === 'Bearer' && token) {
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(payload.sub).lean();
      if (user) req.user = { id: user._id.toString(), name: user.name, email: user.email };
    } catch {
      // ignore
    }
  }
  next();
});

app.get('/', (req, res) => res.json({ ok: true, message: 'E-Library API' }));
app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter({ jwtSecret: JWT_SECRET }));
app.use('/api/books', booksRouter);
app.use('/api/reviews', reviewsRouter({ jwtSecret: JWT_SECRET }));
app.use('/api/contact', contactRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

const dbInfo = await connectDb(MONGODB_URI);
app.listen(PORT, () => {
  console.log(`E-Library API listening on http://127.0.0.1:${PORT}`);
  if (dbInfo.inMemory) console.log(`Using in-memory MongoDB at ${dbInfo.uri}`);
});


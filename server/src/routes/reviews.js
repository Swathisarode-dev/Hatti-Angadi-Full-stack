import { Router } from 'express';
import { z } from 'zod';
import { Review } from '../models/Review.js';
import { requireAuth } from '../utils/auth.js';
import { zodErrorToMessage } from '../utils/validate.js';

export function reviewsRouter({ jwtSecret }) {
  const router = Router();

  router.get('/', async (req, res) => {
    const reviews = await Review.find({}).sort({ createdAt: -1 }).limit(50).lean();
    res.json(
      reviews.map((r) => ({
        id: r._id.toString(),
        name: r.name,
        rating: r.rating,
        message: r.message,
        createdAt: r.createdAt
      }))
    );
  });

  router.post('/', requireAuth(jwtSecret), async (req, res) => {
    const schema = z.object({
      rating: z.number().int().min(1).max(5),
      message: z.string().min(5).max(800)
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: zodErrorToMessage(parsed.error) });

    const created = await Review.create({
      user: req.auth.userId,
      name: req.user?.name || 'User',
      rating: parsed.data.rating,
      message: parsed.data.message
    });

    res.status(201).json({ id: created._id.toString() });
  });

  return router;
}


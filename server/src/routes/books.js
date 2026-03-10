import { Router } from 'express';
import { z } from 'zod';
import { Book } from '../models/Book.js';
import { zodErrorToMessage } from '../utils/validate.js';

export const booksRouter = Router();

booksRouter.get('/', async (req, res) => {
  const { q, language, tag } = req.query;
  const filter = {};
  if (language) filter.language = String(language);
  if (tag) filter.tags = String(tag);
  if (q) {
    const s = String(q);
    filter.$or = [{ title: { $regex: s, $options: 'i' } }, { author: { $regex: s, $options: 'i' } }];
  }
  const books = await Book.find(filter).sort({ createdAt: -1 }).lean();
  res.json(
    books.map((b) => ({
      id: b._id.toString(),
      title: b.title,
      author: b.author,
      language: b.language,
      price: b.price,
      coverImageUrl: b.coverImageUrl || '',
      description: b.description || '',
      tags: b.tags || [],
      inStock: b.inStock
    }))
  );
});

booksRouter.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id).lean();
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json({
    id: book._id.toString(),
    title: book.title,
    author: book.author,
    language: book.language,
    price: book.price,
    coverImageUrl: book.coverImageUrl || '',
    description: book.description || '',
    tags: book.tags || [],
    inStock: book.inStock
  });
});

booksRouter.post('/', async (req, res) => {
  const schema = z.object({
    title: z.string().min(1).max(160),
    author: z.string().min(1).max(120),
    language: z.string().min(1).max(60),
    price: z.number().min(0),
    coverImageUrl: z.string().max(500).optional(),
    description: z.string().max(1200).optional(),
    tags: z.array(z.string().max(40)).optional(),
    inStock: z.boolean().optional()
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: zodErrorToMessage(parsed.error) });

  const created = await Book.create(parsed.data);
  res.status(201).json({ id: created._id.toString() });
});


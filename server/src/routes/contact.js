import { Router } from 'express';
import { z } from 'zod';
import { ContactMessage } from '../models/ContactMessage.js';
import { zodErrorToMessage } from '../utils/validate.js';

export const contactRouter = Router();

contactRouter.post('/', async (req, res) => {
  const schema = z.object({
    name: z.string().min(2).max(80),
    email: z.string().email().max(120),
    phone: z.string().max(25).optional().or(z.literal('')),
    subject: z.string().max(120).optional().or(z.literal('')),
    message: z.string().min(5).max(1200)
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: zodErrorToMessage(parsed.error) });

  await ContactMessage.create({
    name: parsed.data.name,
    email: parsed.data.email.toLowerCase(),
    phone: parsed.data.phone || undefined,
    subject: parsed.data.subject || undefined,
    message: parsed.data.message
  });

  res.status(201).json({ ok: true });
});


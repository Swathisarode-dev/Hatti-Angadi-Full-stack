import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { User } from '../models/User.js';
import { signToken, requireAuth } from '../utils/auth.js';
import { zodErrorToMessage } from '../utils/validate.js';

export function authRouter({ jwtSecret }) {
  const router = Router();

  router.post('/register', async (req, res) => {
    const schema = z.object({
      name: z.string().min(2).max(80),
      email: z.string().email().max(120),
      password: z.string().min(6).max(100),
      phone: z.string().max(25).optional().or(z.literal('')),
      location: z.string().max(120).optional().or(z.literal('')),
      remarks: z.string().max(500).optional().or(z.literal(''))
    });

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: zodErrorToMessage(parsed.error) });

    const { name, email, password, phone, location, remarks } = parsed.data;
    const existing = await User.findOne({ email: email.toLowerCase() }).lean();
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone: phone || undefined,
      location: location || undefined,
      remarks: remarks || undefined,
      passwordHash
    });

    const token = signToken({ userId: user._id.toString() }, jwtSecret);
    res.status(201).json({
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        location: user.location || '',
        remarks: user.remarks || ''
      }
    });
  });

  router.post('/login', async (req, res) => {
    const schema = z.object({
      email: z.string().email().max(120),
      password: z.string().min(1).max(100)
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: zodErrorToMessage(parsed.error) });

    const { email, password } = parsed.data;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid email or password' });

    const token = signToken({ userId: user._id.toString() }, jwtSecret);
    res.json({
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        location: user.location || '',
        remarks: user.remarks || ''
      }
    });
  });

  router.get('/me', requireAuth(jwtSecret), async (req, res) => {
    const user = await User.findById(req.auth.userId).lean();
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      location: user.location || '',
      remarks: user.remarks || ''
    });
  });

  router.patch('/me', requireAuth(jwtSecret), async (req, res) => {
    const schema = z.object({
      name: z.string().min(2).max(80).optional(),
      phone: z.string().max(25).optional().or(z.literal('')),
      location: z.string().max(120).optional().or(z.literal('')),
      remarks: z.string().max(500).optional().or(z.literal(''))
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: zodErrorToMessage(parsed.error) });

    const update = {};
    if (parsed.data.name !== undefined) update.name = parsed.data.name;
    if (parsed.data.phone !== undefined) update.phone = parsed.data.phone || undefined;
    if (parsed.data.location !== undefined) update.location = parsed.data.location || undefined;
    if (parsed.data.remarks !== undefined) update.remarks = parsed.data.remarks || undefined;

    const user = await User.findByIdAndUpdate(req.auth.userId, update, { new: true }).lean();
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      location: user.location || '',
      remarks: user.remarks || ''
    });
  });

  return router;
}


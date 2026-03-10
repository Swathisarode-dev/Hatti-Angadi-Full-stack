import jwt from 'jsonwebtoken';

export function signToken({ userId }, jwtSecret) {
  return jwt.sign({ sub: userId }, jwtSecret, { expiresIn: '7d' });
}

export function requireAuth(jwtSecret) {
  return function (req, res, next) {
    const header = req.headers.authorization || '';
    const [type, token] = header.split(' ');
    if (type !== 'Bearer' || !token) {
      return res.status(401).json({ error: 'Missing Bearer token' });
    }
    try {
      const payload = jwt.verify(token, jwtSecret);
      req.auth = { userId: payload.sub };
      return next();
    } catch {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}


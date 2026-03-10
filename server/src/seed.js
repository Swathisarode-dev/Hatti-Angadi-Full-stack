import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDb } from './db.js';
import { User } from './models/User.js';
import { Book } from './models/Book.js';
import { Review } from './models/Review.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/e_library';

const sampleBooks = [
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    language: 'English',
    price: 299,
    coverImageUrl: '/images/menu/bruschetta.jfif',
    description: 'A modern classic about following your dreams and listening to your heart.',
    tags: ['Fiction', 'Self-help']
  },
  {
    title: 'Wings of Fire',
    author: 'A. P. J. Abdul Kalam',
    language: 'English',
    price: 249,
    coverImageUrl: '/images/menu/rasmalai.jfif',
    description: 'An inspiring autobiography about vision, work, and resilience.',
    tags: ['Biography', 'Inspiration']
  },
  {
    title: 'ಕನ್ನಡ ಕಾವ್ಯ ಸಂಗ್ರಹ',
    author: 'Various',
    language: 'Kannada',
    price: 199,
    coverImageUrl: '/images/menu/kobri_mittai.jpg',
    description: 'A curated set of popular Kannada poems and short pieces.',
    tags: ['Poetry', 'Regional']
  },
  {
    title: 'Don Quixote',
    author: 'Miguel de Cervantes',
    language: 'Spanish',
    price: 349,
    coverImageUrl: '/images/menu/kunafa.jfif',
    description: 'A foundational work of Western literature packed with humor and adventure.',
    tags: ['Classic', 'Adventure']
  }
];

async function main() {
  await connectDb(MONGODB_URI);

  await Promise.all([User.deleteMany({}), Book.deleteMany({}), Review.deleteMany({})]);

  const passwordHash = await bcrypt.hash('Password123', 10);
  const user = await User.create({
    name: 'Demo User',
    email: 'demo@elibrary.com',
    phone: '+91 90000 00000',
    location: 'Bengaluru',
    remarks: 'Demo account',
    passwordHash
  });

  const books = await Book.insertMany(sampleBooks);

  await Review.insertMany([
    { user: user._id, name: user.name, rating: 5, message: 'Clean UI and great collection!' },
    { name: 'Asha', rating: 4, message: 'Loved the language filters and cart flow.' }
  ]);

  console.log(`Seeded: ${books.length} books, 1 user (demo@elibrary.com / Password123)`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


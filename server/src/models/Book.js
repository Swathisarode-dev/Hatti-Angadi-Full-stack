import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    author: { type: String, required: true, trim: true, maxlength: 120 },
    language: { type: String, required: true, trim: true, maxlength: 60 },
    price: { type: Number, required: true, min: 0 },
    coverImageUrl: { type: String, trim: true, maxlength: 500 },
    description: { type: String, trim: true, maxlength: 1200 },
    tags: [{ type: String, trim: true, maxlength: 40 }],
    inStock: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Book = mongoose.model('Book', bookSchema);


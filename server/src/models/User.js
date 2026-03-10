import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true, index: true },
    phone: { type: String, trim: true, maxlength: 25 },
    location: { type: String, trim: true, maxlength: 120 },
    passwordHash: { type: String, required: true },
    remarks: { type: String, trim: true, maxlength: 500 }
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);


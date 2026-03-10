import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export async function connectDb(mongoUri) {
  mongoose.set('strictQuery', true);
  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2500 });
    return { uri: mongoUri, inMemory: false };
  } catch (e) {
    const mem = await MongoMemoryServer.create();
    const uri = mem.getUri();
    await mongoose.connect(uri);
    return { uri, inMemory: true };
  }
}


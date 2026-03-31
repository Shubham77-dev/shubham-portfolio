import mongoose from 'mongoose';

export async function connectDB() {
  const uri = "mongodb+srv://patidarshubham443_db_user:Shubham1234@cluster0.tchdcls.mongodb.net/?appName=Cluster0"
  if (!uri) {
    throw new Error('Missing MONGODB_URI in environment variables');
  }

  mongoose.set('strictQuery', true);

  await mongoose.connect(uri);
  // eslint-disable-next-line no-console
  console.log('MongoDB connected');
}


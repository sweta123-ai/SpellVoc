const mongoose = require('mongoose');

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');
  mongoose.set('strictQuery', true);
  const isSrv = /mongodb\+srv:\/\//i.test(uri);
  const baseOpts = { dbName: process.env.MONGODB_DB || undefined, serverSelectionTimeoutMS: 20000 };
  const tlsOpts = isSrv ? {} : { tls: true };
  try {
    await mongoose.connect(uri, { ...baseOpts, ...tlsOpts });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('[DB] Connection error:', err?.message);
    console.error('[DB] Hint: Ensure your MONGODB_URI uses mongodb+srv for Atlas or has tls=true, your IP is whitelisted, and your system time is correct.');
    throw err;
  }
}

module.exports = { connectToDatabase };
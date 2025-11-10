const mongoose = require('mongoose');

let connectionPromise = null;

async function connectToDatabase() {
  // If already connected, return immediately
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // If connection is in progress, return the existing promise
  if (connectionPromise) {
    return connectionPromise;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');
  
  mongoose.set('strictQuery', true);
  
  // Configure connection options for better serverless handling
  const isSrv = /mongodb\+srv:\/\//i.test(uri);
  const baseOpts = { 
    dbName: process.env.MONGODB_DB || undefined, 
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 10000,
    maxPoolSize: 10,
    minPoolSize: 1
  };
  const tlsOpts = isSrv ? {} : { tls: true };
  
  connectionPromise = mongoose.connect(uri, { ...baseOpts, ...tlsOpts })
    .then(() => {
      console.log('✅ Connected to MongoDB');
      return mongoose.connection;
    })
    .catch((err) => {
      console.error('[DB] Connection error:', err?.message);
      console.error('[DB] Hint: Ensure your MONGODB_URI uses mongodb+srv for Atlas or has tls=true, your IP is whitelisted, and your system time is correct.');
      connectionPromise = null; // Reset promise on error so we can retry
      throw err;
    });

  return connectionPromise;
}

// Helper function to ensure connection is ready before database operations
async function ensureConnection() {
  // If already connected, return immediately
  if (mongoose.connection.readyState === 1) {
    return true;
  }

  // If connecting, wait for it
  if (mongoose.connection.readyState === 2) {
    await new Promise((resolve) => {
      mongoose.connection.once('connected', resolve);
      mongoose.connection.once('error', resolve);
    });
    return mongoose.connection.readyState === 1;
  }

  // If disconnected or uninitialized, connect
  try {
    await connectToDatabase();
    return true;
  } catch (err) {
    console.error('[DB] Failed to ensure connection:', err?.message);
    return false;
  }
}

module.exports = { connectToDatabase, ensureConnection };
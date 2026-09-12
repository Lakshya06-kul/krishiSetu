import mongoose from 'mongoose';
import dns from 'dns';

// Fix for Windows DNS ECONNREFUSED on MongoDB SRV queries
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  console.warn('DNS server override failed, using default system DNS');
}

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://lakshyakulshrestha78_db_user:eQqtg5s8UBnTNvBS@cluster0.dykyii2.mongodb.net/krishisetu?retryWrites=true&w=majority&appName=Cluster0';
    
    await mongoose.connect(mongoURI);
    console.log('✅ [MongoDB Atlas] Successfully connected to KrishiSetu cluster');
  } catch (error) {
    console.error('❌ [MongoDB Atlas] Connection Error:', error);
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ [MongoDB Atlas] Disconnected from cluster');
});

import mongoose from 'mongoose';

const streamerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  followers: {
    type: Number,
    default: 0,
  },
  averageViewers: {
    type: Number,
    default: 0,
  },
  tradingStyle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  socialLinks: {
    youtube: String,
    twitter: String,
    instagram: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Streamer || mongoose.model('Streamer', streamerSchema); 
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
    youtube: { type: String, default: '' },
    twitter: { type: String, default: '' },
    discord: { type: String, default: '' },
  },
}, {
  timestamps: true,
});

export const Streamer = mongoose.models.Streamer || mongoose.model('Streamer', streamerSchema);
export default Streamer; 
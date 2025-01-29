export interface Streamer {
  _id: string;
  name: string;
  title: string;
  tradingStyle: string;
  description: string;
  followers: number;
  averageViewers: number;
  socialLinks: {
    twitter: string;
    discord: string;
    youtube: string;
  };
} 
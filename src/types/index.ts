export type Platform = 'Twitter' | 'Instagram' | 'LinkedIn' | 'TikTok' | 'Reddit';
export type Sentiment = 'Positive' | 'Neutral' | 'Negative';

export interface Mention {
  id: string;
  keyword: string;
  content: string;
  author: string;
  platform: Platform;
  sentiment: Sentiment;
  engagementScore: number;
  timestamp: string;
  avatarUrl?: string;
}

export interface Trend {
  id: string;
  topic: string;
  volume: number;
  momentum: number; // Percentage growth in last hour
  sentimentScore: number; // 0 to 100
  topPlatforms: Platform[];
  isSpiking: boolean;
}

export interface KPIs {
  totalMentions: number;
  avgEngagementRate: number;
  viralityScore: number;
  activeTrends: number;
  mentionsChange: number; // % change
  engagementChange: number; // % change
  viralityChange: number; // % change
}

export interface Insight {
  id: string;
  title: string;
  content: string;
  actionable: boolean;
  confidence: number;
  type: 'Demographic' | 'Sentiment' | 'Anomaly' | 'Predictive';
}

export interface ChartDataPoint {
  time: string;
  value: number;
  platform?: Platform;
  sentiment?: Sentiment;
}

import { KPIs, Trend, Mention, Insight, ChartDataPoint, Platform } from '@/types';

// Utility to generate random numbers in a range
const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateInitialKPIs = (): KPIs => ({
  totalMentions: 1245902,
  avgEngagementRate: 4.8,
  viralityScore: 84,
  activeTrends: 142,
  mentionsChange: 12.5,
  engagementChange: -1.2,
  viralityChange: 5.4,
});

export const generateInitialTrends = (): Trend[] => [
  { id: '1', topic: '#NextJs15', volume: 45200, momentum: 120, sentimentScore: 85, topPlatforms: ['Twitter', 'LinkedIn'], isSpiking: true },
  { id: '2', topic: 'AI Agents', volume: 120500, momentum: 45, sentimentScore: 60, topPlatforms: ['Twitter', 'Reddit'], isSpiking: false },
  { id: '3', topic: 'Tech Layoffs', volume: 85000, momentum: -10, sentimentScore: 20, topPlatforms: ['LinkedIn', 'Twitter'], isSpiking: false },
  { id: '4', topic: 'Spatial Computing', volume: 32000, momentum: 210, sentimentScore: 78, topPlatforms: ['Twitter', 'TikTok'], isSpiking: true },
  { id: '5', topic: 'AGI Timeline', volume: 67000, momentum: 15, sentimentScore: 50, topPlatforms: ['Reddit', 'Twitter'], isSpiking: false },
  { id: '6', topic: 'React Server Comp', volume: 29000, momentum: 5, sentimentScore: 65, topPlatforms: ['Twitter'], isSpiking: false },
  { id: '7', topic: '#IndieHacker', volume: 15400, momentum: 22, sentimentScore: 92, topPlatforms: ['Twitter', 'LinkedIn'], isSpiking: true },
  { id: '8', topic: 'Open Source Model', volume: 94000, momentum: 88, sentimentScore: 80, topPlatforms: ['Twitter', 'Reddit'], isSpiking: true },
];

export const generateInitialInsights = (): Insight[] => [
  { id: 'i1', title: 'Gen-Z driving #NextJs15', content: 'Mentions for Next.js 15 spiked by 240% among profiles identified as Gen-Z in the last 3 hours, heavily grouped in Tier-2 Indian cities.', actionable: false, confidence: 92, type: 'Demographic' },
  { id: 'i2', title: 'Sentiment Drop: Tech Layoffs', content: 'Negative sentiment increased by 15% overnight across LinkedIn. Recommend pausing aggressive recruitment ads.', actionable: true, confidence: 88, type: 'Sentiment' },
  { id: 'i3', title: 'Anomaly Detected', content: 'Unusual spike in TikTok engagement for "Spatial Computing" without corresponding Twitter volume. Investigating potential bot network.', actionable: true, confidence: 76, type: 'Anomaly' },
  { id: 'i4', title: 'Viral Prediction', content: '"AI Agents" topic shows early trajectory similar to past mega-trends. Expect a 300% volume increase in the next 24 hours.', actionable: false, confidence: 84, type: 'Predictive' },
];

export const generateMockMention = (): Mention => {
  const platforms: Platform[] = ['Twitter', 'Instagram', 'LinkedIn', 'TikTok', 'Reddit'];
  const sentiments: ('Positive' | 'Neutral' | 'Negative')[] = ['Positive', 'Neutral', 'Negative'];
  const topics = ['#NextJs15', 'AI Agents', 'Tech Layoffs', 'Spatial Computing', 'AGI Timeline'];
  
  return {
    id: `m-${Date.now()}-${rand(1000, 9999)}`,
    keyword: topics[rand(0, topics.length - 1)],
    content: `Just saw the latest updates on ${topics[rand(0, topics.length - 1)]}. Mind blown. The future is here and it's moving fast! #tech #future`,
    author: `@user${rand(100, 9999)}`,
    platform: platforms[rand(0, platforms.length - 1)],
    sentiment: sentiments[rand(0, sentiments.length - 1)],
    engagementScore: rand(1, 1000),
    timestamp: new Date().toISOString(),
    avatarUrl: `https://i.pravatar.cc/150?u=${rand(1, 1000)}`
  };
};

export const generateChartData = (points: number = 24): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  let baseValue = 5000;
  for (let i = points; i >= 0; i--) {
    const d = new Date();
    d.setHours(d.getHours() - i);
    baseValue = baseValue + rand(-500, 800);
    if (baseValue < 0) baseValue = 100;
    data.push({
      time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      value: baseValue,
    });
  }
  return data;
};

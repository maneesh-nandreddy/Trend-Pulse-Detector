import { create } from 'zustand';
import { KPIs, Trend, Mention, Insight, ChartDataPoint } from '@/types';
import { generateInitialKPIs, generateInitialTrends, generateInitialInsights, generateChartData } from '@/lib/mockService';

interface AppState {
  kpis: KPIs;
  trends: Trend[];
  insights: Insight[];
  liveMentions: Mention[];
  chartData: ChartDataPoint[];
  isConnected: boolean;
  addMention: (mention: Mention) => void;
  setConnectionStatus: (status: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  kpis: generateInitialKPIs(),
  trends: generateInitialTrends(),
  insights: generateInitialInsights(),
  liveMentions: [],
  chartData: generateChartData(24),
  isConnected: false,
  
  addMention: (mention) => set((state) => {
    // Keep max 50 items for performance
    const newMentions = [mention, ...state.liveMentions].slice(0, 50);
    
    // Slightly adjust KPIs dynamically for the real-time feel
    const newKpis = { ...state.kpis };
    newKpis.totalMentions += 1;
    // Add a tiny bit of random wobble
    newKpis.avgEngagementRate += (Math.random() > 0.5 ? 0.01 : -0.01);
    
    return { 
      liveMentions: newMentions,
      kpis: newKpis
    };
  }),

  setConnectionStatus: (status) => set({ isConnected: status })
}));

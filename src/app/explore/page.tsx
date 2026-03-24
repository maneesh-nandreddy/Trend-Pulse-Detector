'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Search, Filter, SlidersHorizontal, Database } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const filters = {
  platforms: ['Twitter', 'LinkedIn', 'Reddit', 'TikTok'],
  sentiments: ['Positive', 'Neutral', 'Negative']
};

export default function ExplorePage() {
  const { liveMentions } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activePlatform, setActivePlatform] = useState<string | null>(null);

  // Simulated search filtering (Mocking Elasticsearch)
  const results = liveMentions.filter(m => {
    const matchesQuery = m.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         m.keyword.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = activePlatform ? m.platform === activePlatform : true;
    return matchesQuery && matchesPlatform;
  });

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-100 flex items-center gap-3">
            Search & Explore
          </h1>
          <p className="text-slate-400 mt-1">Deep dive into historical and realtime data</p>
        </div>
        <Badge variant="outline" className="border-indigo-500/30 bg-indigo-500/10 text-indigo-400 flex gap-2">
          <Database className="w-4 h-4" />
          Elasticsearch Cluster
        </Badge>
      </div>

      <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-140px)]">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 flex flex-col gap-6">
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-md">
            <CardContent className="p-4 flex flex-col gap-6">
              <div>
                <h4 className="font-semibold text-slate-200 flex items-center gap-2 mb-3">
                  <Filter className="w-4 h-4 text-blue-400" /> Platform
                </h4>
                <div className="flex flex-col gap-2">
                  {filters.platforms.map(p => (
                    <button 
                      key={p} 
                      onClick={() => setActivePlatform(activePlatform === p ? null : p)}
                      className={`text-sm text-left px-3 py-1.5 rounded-md transition-colors ${activePlatform === p ? 'bg-blue-500/20 text-blue-400' : 'text-slate-400 hover:bg-slate-800'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-200 flex items-center gap-2 mb-3">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-400" /> Sentiment
                </h4>
                <div className="flex flex-wrap gap-2">
                  {filters.sentiments.map(s => (
                    <Badge key={s} variant="outline" className="bg-slate-800 border-slate-700 text-slate-300">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Results */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Query Elasticsearch cluster (e.g. 'AI Agents', 'layoffs')..." 
              className="pl-11 bg-slate-900/80 border-slate-700 text-slate-100 placeholder:text-slate-500 focus-visible:ring-blue-500 h-12 text-lg rounded-xl"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>Showing {results.length} matches in 24ms</span>
            <Button variant="ghost" size="sm" className="text-blue-400 hover:bg-blue-500/10">Sort by Relevance</Button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4 pb-12">
            {results.map((mention) => (
              <Card key={mention.id} className="bg-slate-900/40 border-slate-800 hover:border-slate-700 transition-colors">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8 border border-slate-700">
                        <AvatarImage src={mention.avatarUrl} />
                        <AvatarFallback>{mention.author.slice(1, 3)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-semibold text-slate-200">{mention.author}</div>
                        <div className="text-xs text-slate-500">{new Date(mention.timestamp).toLocaleString()} • {mention.platform}</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700">
                      {mention.keyword}
                    </Badge>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {mention.content}
                  </p>
                </CardContent>
              </Card>
            ))}
            
            {results.length === 0 && (
              <div className="text-center py-20 text-slate-500">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No matches found in the current index.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

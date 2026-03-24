'use client';

import { useStore } from '@/store/useStore';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

export function LiveFeed() {
  const { liveMentions } = useStore();

  const getSentimentColor = (sentiment: string) => {
    switch(sentiment) {
      case 'Positive': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Negative': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-slate-800 bg-slate-900/80 sticky top-0 z-10 flex justify-between items-center">
        <h3 className="font-semibold text-slate-200">Live Global Feed</h3>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {liveMentions.length === 0 && (
              <div className="text-center text-slate-500 py-10 text-sm animate-pulse">
                Awaiting events from Kafka stream...
              </div>
            )}
            {liveMentions.map((mention) => (
              <motion.div
                key={mention.id}
                initial={{ opacity: 0, height: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, height: 'auto', scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-slate-600 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6 border border-slate-700">
                      <AvatarImage src={mention.avatarUrl} />
                      <AvatarFallback className="text-[10px]">{mention.author.slice(1, 3)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium text-slate-300">{mention.author}</span>
                    <span className="text-[10px] text-slate-500">on {mention.platform}</span>
                  </div>
                  <Badge variant="outline" className={`text-[10px] uppercase font-bold px-1.5 py-0 ${getSentimentColor(mention.sentiment)}`}>
                    {mention.sentiment}
                  </Badge>
                </div>
                
                <p className="text-sm text-slate-200 leading-relaxed">
                  {mention.content}
                </p>
                
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <div className="flex gap-3">
                    <span className="hover:text-amber-400 transition-colors cursor-pointer">Score: {mention.engagementScore}</span>
                  </div>
                  <span>{new Date(mention.timestamp).toLocaleTimeString()}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </div>
  );
}

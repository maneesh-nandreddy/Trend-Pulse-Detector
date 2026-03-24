import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { generateMockMention } from '@/lib/mockService';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

export const useWebSockets = () => {
  const { addMention, setConnectionStatus, isConnected } = useStore();

  useEffect(() => {
    // Simulate WebSocket Connection delay
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    timeout = setTimeout(() => {
      setConnectionStatus(true);
      toast.success('Connected to live data stream (Kafka via Spark)', {
        description: 'Receiving ~4.2k events/sec...',
        duration: 3000,
      });

      // Start pushing mock events 
      // Fire every 2-5 seconds
      const scheduleNextEvent = () => {
        const nextDelay = Math.random() * 3000 + 2000;
        interval = setTimeout(() => {
          const mention = generateMockMention();
          addMention(mention);
          
          if (mention.engagementScore > 900) {
            toast('Viral Alert!', {
              description: `A post about ${mention.keyword} is gaining extreme traction.`,
              action: {
                label: 'View',
                onClick: () => console.log('Viral post clicked', mention),
              },
            });
            
            // Trigger confetti for big spikes
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
            });
          }
          
          scheduleNextEvent(); // Recursively schedule next
        }, nextDelay);
      };

      scheduleNextEvent();

    }, 1500);

    return () => {
      clearTimeout(timeout);
      clearTimeout(interval);
    };
  }, [addMention, setConnectionStatus]);

  return { isConnected };
};

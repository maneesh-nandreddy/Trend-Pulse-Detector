'use client';

import { useState } from 'react';
import { Hash, Briefcase, Code2, MessageCircle, Settings, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const platforms = [
  { id: 'twitter', name: 'X (Twitter)', icon: Hash, connected: true, rateLimit: '45,000/hr' },
  { id: 'linkedin', name: 'LinkedIn', icon: Briefcase, connected: false, rateLimit: '12,000/hr' },
  { id: 'reddit', name: 'Reddit', icon: MessageCircle, connected: false, rateLimit: '30,000/hr' },
  { id: 'github', name: 'GitHub', icon: Code2, connected: true, rateLimit: '5,000/hr' },
];

export default function OnboardingPage() {
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleConnect = (id: string) => {
    setConnecting(id);
    setTimeout(() => {
      setConnecting(null);
      toast.success('Platform Connected', {
        description: `Successfully established streaming connection to ${id.toUpperCase()} API firehose.`
      });
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto py-8">
      <div className="text-center space-y-4 mb-8">
        <div className="inline-flex p-4 rounded-full bg-blue-500/10 mb-2">
          <Settings className="w-8 h-8 text-blue-400" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-100">
          Connect Data Sources
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-lg">
          Configure API keys to ingest data into the Kafka clusters for real-time processing and streaming.
        </p>
      </div>

      <div className="grid gap-6">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          const isConnecting = connecting === platform.id;
          const isConnected = platform.connected;

          return (
            <Card key={platform.id} className={`bg-slate-900/60 border-${isConnected ? 'emerald-500/30' : 'slate-800'} backdrop-blur-md overflow-hidden`}>
              <CardContent className="p-0 flex flex-col sm:flex-row">
                <div className="p-6 sm:w-1/3 border-b sm:border-b-0 sm:border-r border-slate-800 bg-slate-900/40 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className={`w-6 h-6 ${isConnected ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <h3 className="text-lg font-semibold text-slate-200">{platform.name}</h3>
                  </div>
                  <div className="text-sm text-slate-500 mt-2">
                    Ingestion rate limit: <br/>
                    <span className="font-mono text-slate-300">{platform.rateLimit}</span>
                  </div>
                </div>
                
                <div className="p-6 sm:w-2/3 flex flex-col justify-center">
                  {isConnected ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-lg border border-emerald-500/20">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-medium">Active Streaming Connection</span>
                      </div>
                      <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                        Configure
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-4">
                        <Input 
                          placeholder="API Key" 
                          type="password"
                          className="bg-slate-950/50 border-slate-800 focus-visible:ring-blue-500 text-slate-300"
                          defaultValue="mock_api_key_hidden"
                        />
                        <Input 
                          placeholder="Secret" 
                          type="password"
                          className="bg-slate-950/50 border-slate-800 focus-visible:ring-blue-500 text-slate-300"
                          defaultValue="mock_api_secret_hidden"
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button 
                          onClick={() => handleConnect(platform.id)}
                          disabled={isConnecting}
                          className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
                        >
                          {isConnecting ? (
                            <span className="flex items-center gap-2">
                              <span className="animate-spin w-4 h-4 border-2 border-white rounded-full border-t-transparent" />
                              Connecting...
                            </span>
                          ) : 'Connect Input Stream'}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

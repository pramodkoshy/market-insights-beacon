
import React from 'react';
import { TopNavigation } from '@/components/TopNavigation';
import { ReportGenerator } from '@/components/ReportGenerator';
import { AgentProvider } from '@/agents/AgentContext';

export function ReportPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavigation />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <AgentProvider>
          <ReportGenerator />
        </AgentProvider>
      </div>
    </div>
  );
}

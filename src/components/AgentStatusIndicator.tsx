
import React from 'react';
import { useAgents } from '../agents/AgentContext';
import { Activity, CheckCircle2, AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const AgentStatusIndicator = () => {
  const { isInitialized, isProcessing, lastUpdate } = useAgents();

  if (!isInitialized) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="flex items-center gap-2 text-yellow-500">
            <Activity className="h-4 w-4 animate-pulse" />
            <span className="text-xs">Initializing Agents</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>AI agents are being initialized</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (isProcessing) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="flex items-center gap-2 text-blue-500">
            <Activity className="h-4 w-4 animate-pulse" />
            <span className="text-xs">Processing</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>AI agents are currently processing data</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="flex items-center gap-2 text-green-500">
          <CheckCircle2 className="h-4 w-4" />
          <span className="text-xs">
            Agents Ready
            {lastUpdate && ` • Last update: ${formatTimestamp(lastUpdate)}`}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>AI agents are active and processing in the background</p>
          {lastUpdate && <p className="text-xs mt-1">Last updated: {formatDate(lastUpdate)}</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'just now';
  if (diffInMinutes === 1) return '1 min ago';
  if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours === 1) return '1 hour ago';
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  
  return formatDate(date);
}

function formatDate(date: Date): string {
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}


import { useState, useEffect } from 'react';
import { useAgents } from '../AgentContext';

export function useAgentData(agentType: string) {
  const { isInitialized, latestResults, triggerTask, isProcessing, lastUpdate } = useAgents();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isInitialized && latestResults && latestResults[agentType]) {
      setData(latestResults[agentType]);
      setLoading(false);
      setError(null);
    } else if (isInitialized) {
      // If initialized but no data for this agent type yet, trigger a task
      refreshData();
    }
  }, [isInitialized, latestResults, agentType]);

  const refreshData = async (params?: any) => {
    setLoading(true);
    setError(null);
    
    try {
      triggerTask(agentType, params);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setLoading(false);
    }
  };

  return {
    data,
    loading: loading || (isProcessing && !data),
    error,
    refreshData,
    lastUpdate,
  };
}

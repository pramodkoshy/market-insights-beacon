
import { useState, useEffect, useCallback } from 'react';
import { useAgents } from '../AgentContext';

export function useAgentData(agentType: string, defaultParams: any = {}) {
  const { isInitialized, latestResults, triggerTask, isProcessing, lastUpdate } = useAgents();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentParams, setCurrentParams] = useState(defaultParams);

  useEffect(() => {
    if (isInitialized && latestResults && latestResults[agentType]) {
      console.log(`Setting data for ${agentType} from latest results:`, latestResults[agentType]);
      setData(latestResults[agentType]);
      setLoading(false);
      setError(null);
    } else if (isInitialized) {
      // If initialized but no data for this agent type yet, trigger a task
      console.log(`No data for ${agentType} yet, triggering initial data load`);
      refreshData(defaultParams);
    }
  }, [isInitialized, latestResults, agentType, defaultParams]);

  const refreshData = useCallback(async (params?: any) => {
    setLoading(true);
    setError(null);
    
    const mergedParams = { ...currentParams, ...(params || {}) };
    
    if (params) {
      setCurrentParams(mergedParams);
    }
    
    console.log(`Refreshing data for ${agentType} with params:`, mergedParams);
    
    try {
      const result = await triggerTask(agentType, mergedParams);
      console.log(`Data refreshed for ${agentType}:`, result);
      
      if (result && result[agentType]) {
        setData(result[agentType]);
      }
    } catch (err) {
      console.error(`Error refreshing data for ${agentType}:`, err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [agentType, triggerTask, currentParams]);

  const updateParams = useCallback((newParams: any) => {
    console.log(`Updating params for ${agentType}:`, newParams);
    refreshData(newParams);
  }, [agentType, refreshData]);

  return {
    data,
    loading: loading || (isProcessing && !data),
    error,
    refreshData,
    updateParams,
    currentParams,
    lastUpdate,
  };
}

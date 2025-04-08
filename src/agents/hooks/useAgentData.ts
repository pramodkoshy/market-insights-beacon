
import { useState, useEffect, useCallback } from 'react';
import { useAgents } from '../AgentContext';

export function useAgentData(agentType: string, defaultParams: any = {}) {
  const { isInitialized, latestResults, triggerTask, isProcessing, lastUpdate } = useAgents();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentParams, setCurrentParams] = useState(defaultParams);
  const [configHistory, setConfigHistory] = useState<any[]>([]);

  useEffect(() => {
    if (isInitialized && latestResults && latestResults[agentType]) {
      console.log(`Setting data for ${agentType} from latest results:`, latestResults[agentType]);
      setData(latestResults[agentType]);
      setLoading(false);
      setError(null);
      
      // Add the configuration to history if it exists in metadata
      if (latestResults[agentType].metadata?.generatedWith) {
        const newConfig = {
          timestamp: latestResults[agentType].metadata.timestamp || new Date().toISOString(),
          params: latestResults[agentType].metadata.generatedWith,
          configuredBy: latestResults[agentType].metadata.configuredBy || 'system'
        };
        
        setConfigHistory(prev => {
          // Check if this config already exists
          const exists = prev.some(config => 
            JSON.stringify(config.params) === JSON.stringify(newConfig.params)
          );
          
          if (!exists) {
            return [...prev, newConfig].slice(-5); // Keep last 5 configs
          }
          return prev;
        });
      }
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
        
        // Add to config history
        const newConfig = {
          timestamp: new Date().toISOString(),
          params: mergedParams,
          configuredBy: 'user'
        };
        
        setConfigHistory(prev => {
          // Check if this config already exists
          const exists = prev.some(config => 
            JSON.stringify(config.params) === JSON.stringify(newConfig.params)
          );
          
          if (!exists) {
            return [...prev, newConfig].slice(-5); // Keep last 5 configs
          }
          return prev;
        });
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

  const rerunWithConfig = useCallback((configIndex: number) => {
    if (configHistory[configIndex]) {
      console.log(`Rerunning ${agentType} with historical config:`, configHistory[configIndex].params);
      refreshData(configHistory[configIndex].params);
    }
  }, [configHistory, refreshData, agentType]);

  return {
    data,
    loading: loading || (isProcessing && !data),
    error,
    refreshData,
    updateParams,
    currentParams,
    configHistory,
    rerunWithConfig,
    lastUpdate,
  };
}

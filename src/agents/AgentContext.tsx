
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AgentSystem } from './AgentSystem';

type AgentContextType = {
  agentSystem: AgentSystem | null;
  isInitialized: boolean;
  isProcessing: boolean;
  lastUpdate: Date | null;
  latestResults: Record<string, any>;
  triggerTask: (taskType: string, params?: any) => void;
};

const AgentContext = createContext<AgentContextType>({
  agentSystem: null,
  isInitialized: false,
  isProcessing: false,
  lastUpdate: null,
  latestResults: {},
  triggerTask: () => {},
});

export const useAgents = () => useContext(AgentContext);

export const AgentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [agentSystem, setAgentSystem] = useState<AgentSystem | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [latestResults, setLatestResults] = useState<Record<string, any>>({});

  useEffect(() => {
    const initAgentSystem = async () => {
      try {
        const system = new AgentSystem();
        await system.initialize();
        
        setAgentSystem(system);
        setIsInitialized(true);
        
        // Initialize with mock data to avoid empty UI
        const initialResults = await system.runSimulation();
        setLatestResults(initialResults);
        setLastUpdate(new Date());
        
        // Start background tasks
        system.startBackgroundTasks((results) => {
          setLatestResults(prev => ({ ...prev, ...results }));
          setLastUpdate(new Date());
        });
      } catch (error) {
        console.error("Failed to initialize agent system:", error);
      }
    };

    initAgentSystem();

    return () => {
      if (agentSystem) {
        agentSystem.stopBackgroundTasks();
      }
    };
  }, []);

  const triggerTask = async (taskType: string, params?: any) => {
    if (!agentSystem || !isInitialized) return;
    
    setIsProcessing(true);
    try {
      const results = await agentSystem.runTask(taskType, params);
      setLatestResults(prev => ({ ...prev, ...results }));
      setLastUpdate(new Date());
    } catch (error) {
      console.error(`Error running task ${taskType}:`, error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AgentContext.Provider 
      value={{
        agentSystem,
        isInitialized,
        isProcessing,
        lastUpdate,
        latestResults,
        triggerTask,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};

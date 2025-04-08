
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AgentSystem } from './AgentSystem';

type AgentContextType = {
  agentSystem: AgentSystem | null;
  isInitialized: boolean;
  isProcessing: boolean;
  lastUpdate: Date | null;
  latestResults: Record<string, any>;
  triggerTask: (taskType: string, params?: any) => Promise<Record<string, any>>;
  runAllAgents: (customParams?: Record<string, any>) => Promise<Record<string, any>>;
};

const AgentContext = createContext<AgentContextType>({
  agentSystem: null,
  isInitialized: false,
  isProcessing: false,
  lastUpdate: null,
  latestResults: {},
  triggerTask: async () => ({}),
  runAllAgents: async () => ({}),
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
        console.log("Initializing agent system...");
        const system = new AgentSystem();
        await system.initialize();
        
        setAgentSystem(system);
        setIsInitialized(true);
        console.log("Agent system initialized successfully");
        
        // Initialize with mock data to avoid empty UI
        const initialResults = await system.runSimulation();
        setLatestResults(initialResults);
        setLastUpdate(new Date());
        console.log("Initial simulation data loaded:", initialResults);
        
        // Start background tasks
        system.startBackgroundTasks((results) => {
          console.log("Background task completed with results:", results);
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
        console.log("Stopping background tasks");
        agentSystem.stopBackgroundTasks();
      }
    };
  }, []);

  const triggerTask = async (taskType: string, params: any = {}): Promise<Record<string, any>> => {
    if (!agentSystem || !isInitialized) {
      console.warn("Cannot trigger task: agent system not initialized");
      return {};
    }
    
    console.log(`Triggering task ${taskType} with params:`, params);
    setIsProcessing(true);
    
    try {
      const results = await agentSystem.runTask(taskType, params);
      console.log(`Task ${taskType} completed with results:`, results);
      
      setLatestResults(prev => ({ ...prev, ...results }));
      setLastUpdate(new Date());
      
      return results;
    } catch (error) {
      console.error(`Error running task ${taskType}:`, error);
      return {};
    } finally {
      setIsProcessing(false);
    }
  };

  const runAllAgents = async (customParams: Record<string, any> = {}): Promise<Record<string, any>> => {
    if (!agentSystem || !isInitialized) {
      console.warn("Cannot run all agents: agent system not initialized");
      return {};
    }
    
    console.log("Running all agents with custom params:", customParams);
    setIsProcessing(true);
    
    try {
      const results = await agentSystem.runSimulation(customParams);
      console.log("All agents completed with results:", results);
      
      setLatestResults(results);
      setLastUpdate(new Date());
      
      return results;
    } catch (error) {
      console.error("Error running all agents:", error);
      return {};
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
        runAllAgents,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};

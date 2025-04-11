
import { simulations } from "./AgentSimulations";

// Define a simple runnable sequence without relying on external packages
class SimpleRunnableSequence {
  steps: any[];
  
  constructor(steps: any[]) {
    this.steps = steps;
  }
  
  static from(steps: any[]) {
    return new SimpleRunnableSequence(steps);
  }
  
  async invoke(input: any) {
    let currentInput = input;
    for (const step of this.steps) {
      const stepFunction = Object.values(step)[0] as (input: any) => Promise<any>;
      currentInput = await stepFunction(currentInput);
    }
    return currentInput;
  }
}

interface AgentTask {
  id: string;
  type: string;
  params: any;
  state: "queued" | "running" | "completed" | "failed";
  result: any;
  error?: any;
}

interface N8nWorkflow {
  id: string;
  name: string;
  channelType: string;
  n8nUrl: string;
  apiKey: string;
  workflowId: string;
  isActive: boolean;
  lastRun?: string;
  status?: 'success' | 'warning' | 'error';
}

interface WorkflowExecutionResult {
  success: boolean;
  data?: any;
  error?: string;
  executionTime: number;
  workflowId: string;
}

export class AgentSystem {
  private isInitialized: boolean = false;
  private taskQueue: AgentTask[] = [];
  private backgroundInterval: NodeJS.Timeout | null = null;
  private agents: Map<string, any> = new Map();
  private graphs: Map<string, any> = new Map();
  private updateCallback: ((results: Record<string, any>) => void) | null = null;
  private workflows: N8nWorkflow[] = [];
  private workflowLogs: any[] = [];

  constructor() {
    this.taskQueue = [];
    console.log("AgentSystem initialized");
  }

  async initialize(): Promise<void> {
    try {
      // In a real implementation, we would create actual LangChain agents here
      // For now, we'll just simulate the agent behavior
      this.setupAgents();
      this.setupGraphs();
      this.isInitialized = true;
      console.log("AgentSystem fully initialized with agents and graphs");
    } catch (error) {
      console.error("Failed to initialize agent system:", error);
      throw error;
    }
  }

  private setupAgents(): void {
    // In a production app, we would create real LangChain agents
    // For now, we'll create placeholder objects
    const agentTypes = [
      "marketTrends", 
      "customerSegmentation", 
      "campaignPerformance", 
      "roiAnalysis"
    ];
    
    agentTypes.forEach(type => {
      this.agents.set(type, {
        name: type,
        run: async (params: any) => {
          // Simulate agent processing with custom parameters
          console.log(`Agent ${type} running with params:`, params);
          
          // Get the default simulation data
          const defaultData = simulations[type] || { message: "No data available" };
          
          // If there are custom parameters, modify the simulation results
          if (params && Object.keys(params).length > 0) {
            console.log(`Customizing ${type} agent output based on parameters`);
            
            // Deep clone the data to avoid modifying the original
            const customData = JSON.parse(JSON.stringify(defaultData));
            
            // Check if we need to trigger any workflows for this agent run
            if (params.triggerWorkflows && this.workflows.length > 0) {
              console.log(`Looking for workflows to trigger for ${type} agent`);
              
              // Find any active workflows that should be triggered for this agent type
              const relevantWorkflows = this.workflows.filter(wf => wf.isActive);
              
              if (relevantWorkflows.length > 0) {
                console.log(`Found ${relevantWorkflows.length} active workflows to trigger`);
                
                // Trigger workflows in parallel
                const workflowResults = await Promise.all(
                  relevantWorkflows.map(workflow => this.executeN8nWorkflow(workflow, {
                    agentType: type,
                    timestamp: new Date().toISOString(),
                    agentData: customData,
                    ...params
                  }))
                );
                
                // Add workflow results to the agent output
                customData.workflowExecutions = workflowResults;
              }
            }
            
            // Apply custom modifications based on agent type and parameters
            if (type === "marketTrends") {
              if (params.industryFocus) {
                customData.industryFocus = params.industryFocus;
                customData.title = `Market Trends: ${params.industryFocus} Industry`;
                
                // Update data points to reflect industry focus
                if (customData.data && customData.data.marketShare) {
                  customData.data.marketShare.title = `${params.industryFocus} Market Share`;
                }
                
                if (customData.data && customData.data.trendAnalysis) {
                  customData.data.trendAnalysis.title = `${params.industryFocus} Industry Trends`;
                }
              }
              
              if (params.timeframe) {
                customData.timeframe = params.timeframe;
                customData.title = customData.title + ` (${params.timeframe})`;
              }
              
              if (params.reportName) {
                customData.title = `Report: ${params.reportName}`;
                customData.metadata = {
                  ...(customData.metadata || {}),
                  reportId: params.reportId,
                  generatedFor: params.reportName
                };
              }
            }
            
            if (type === "customerSegmentation") {
              if (params.segment) {
                customData.segmentName = params.segment;
                customData.title = `Customer Insights: ${params.segment} Segment`;
                
                // Update data points to reflect segment
                if (customData.data && customData.data.demographics) {
                  customData.data.demographics.title = `${params.segment} Demographics`;
                }
                
                if (customData.data && customData.data.behaviouralInsights) {
                  customData.data.behaviouralInsights.title = `${params.segment} Behavioral Insights`;
                }
              }
              
              if (params.customerName) {
                customData.title = `Customer: ${params.customerName}`;
                customData.metadata = {
                  ...(customData.metadata || {}),
                  customerId: params.customerId,
                  customerName: params.customerName
                };
              }
            }
            
            if (type === "campaignPerformance") {
              if (params.timeframe) {
                customData.timeframe = params.timeframe;
                customData.title = `Campaign Performance (${params.timeframe})`;
                
                // Adjust date ranges in the visualization based on timeframe
                if (customData.data && customData.data.performanceMetrics) {
                  customData.data.performanceMetrics.timeframe = params.timeframe;
                }
              }
              
              if (params.campaignId) {
                customData.campaignId = params.campaignId;
                
                if (params.campaignName) {
                  customData.title = `Campaign: ${params.campaignName}`;
                  customData.metadata = {
                    ...(customData.metadata || {}),
                    campaignId: params.campaignId,
                    campaignName: params.campaignName
                  };
                  
                  // Update data points to reflect campaign name
                  if (customData.data && customData.data.performanceMetrics) {
                    customData.data.performanceMetrics.title = `${params.campaignName} Metrics`;
                  }
                  
                  if (customData.data && customData.data.channelBreakdown) {
                    customData.data.channelBreakdown.title = `${params.campaignName} Channel Performance`;
                  }
                }
              }
            }
            
            if (type === "roiAnalysis") {
              if (params.timeframe) {
                customData.timeframe = params.timeframe;
                customData.title = `ROI Analysis - ${params.timeframe}`;
                
                // Update time periods in ROI calculations
                if (customData.data && customData.data.roiTrend) {
                  customData.data.roiTrend.period = params.timeframe;
                }
              }
              
              if (params.campaignId && params.campaignName) {
                customData.title = `ROI Analysis: ${params.campaignName}`;
                customData.campaignFocus = params.campaignName;
                
                // Update data to focus on specific campaign
                if (customData.data && customData.data.investmentBreakdown) {
                  customData.data.investmentBreakdown.title = `${params.campaignName} Investment Breakdown`;
                }
              }
            }
            
            // Add metadata about parameters used
            customData.metadata = {
              ...(customData.metadata || {}),
              generatedWith: params,
              timestamp: new Date().toISOString(),
              configuredBy: "user"
            };
            
            return customData;
          }
          
          return defaultData;
        }
      });
    });
    
    console.log(`Setup ${agentTypes.length} agents`);
  }

  private setupGraphs(): void {
    // In a production app, we would set up actual LangGraph workflows
    // For demonstration, we'll set up simple sequences
    this.agents.forEach((agent, agentType) => {
      // Create a simple graph that just runs the agent
      const graph = SimpleRunnableSequence.from([
        {
          validateInput: async (input: any) => {
            console.log(`Graph for ${agentType} validating input:`, input);
            // In a real system, we would validate the input parameters here
            return input;
          }
        },
        {
          runAgent: async (input: any) => {
            console.log(`Graph for ${agentType} running agent with input:`, input);
            return await agent.run(input);
          }
        },
        {
          processResults: async (input: any) => {
            console.log(`Graph for ${agentType} processing results:`, input);
            return {
              [agentType]: input,
              timestamp: new Date().toISOString()
            };
          }
        }
      ]);
      
      this.graphs.set(agentType, graph);
    });
    
    console.log(`Setup ${this.graphs.size} agent graphs`);
  }

  async runTask(taskType: string, params: any = {}): Promise<Record<string, any>> {
    if (!this.isInitialized || !this.graphs.has(taskType)) {
      throw new Error(`Agent system not initialized or unknown task type: ${taskType}`);
    }

    try {
      console.log(`Running task ${taskType} with params:`, params);
      const graph = this.graphs.get(taskType);
      
      // Add workflow triggering capability to all agent runs
      const enhancedParams = {
        ...params,
        triggerWorkflows: true
      };
      
      const result = await graph.invoke(enhancedParams);
      console.log(`Task ${taskType} completed with result:`, result);
      return result;
    } catch (error) {
      console.error(`Error running task ${taskType}:`, error);
      throw error;
    }
  }

  async runSimulation(customParams: Record<string, any> = {}): Promise<Record<string, any>> {
    // Generate mock data based on parameters if provided
    const results: Record<string, any> = {};
    
    console.log("Running simulation for all agents with params:", customParams);
    for (const [agentType, agent] of this.agents.entries()) {
      // Get agent-specific parameters if provided
      const agentParams = customParams[agentType] || {};
      console.log(`Running simulation for ${agentType} with params:`, agentParams);
      
      results[agentType] = await agent.run(agentParams);
    }
    
    return results;
  }

  startBackgroundTasks(callback: (results: Record<string, any>) => void): void {
    this.updateCallback = callback;
    
    console.log("Starting background tasks");
    // Run background tasks every few minutes (reduced for demo purposes)
    this.backgroundInterval = setInterval(async () => {
      if (!this.isInitialized) return;
      
      try {
        // Run a random agent to simulate background processing
        const agentTypes = Array.from(this.agents.keys());
        const randomType = agentTypes[Math.floor(Math.random() * agentTypes.length)];
        
        console.log(`Running background task for agent ${randomType}`);
        const result = await this.runTask(randomType, {
          background: true,
          timestamp: new Date().toISOString(),
          automated: true
        });
        
        if (this.updateCallback) {
          console.log(`Updating with new data from ${randomType}`);
          this.updateCallback(result);
        }
      } catch (error) {
        console.error("Error in background task:", error);
      }
    }, 30 * 1000); // Run every 30 seconds for demonstration purposes
  }

  stopBackgroundTasks(): void {
    if (this.backgroundInterval) {
      clearInterval(this.backgroundInterval);
      this.backgroundInterval = null;
      console.log("Background tasks stopped");
    }
  }
  
  setWorkflows(workflows: N8nWorkflow[]): void {
    this.workflows = workflows;
    console.log(`Updated workflows configuration with ${workflows.length} workflows`);
  }
  
  getWorkflows(): N8nWorkflow[] {
    return this.workflows;
  }
  
  getWorkflowLogs(): any[] {
    return this.workflowLogs;
  }
  
  async executeN8nWorkflow(workflow: N8nWorkflow, data: any): Promise<WorkflowExecutionResult> {
    console.log(`Executing n8n workflow: ${workflow.name} (ID: ${workflow.id})`);
    console.log(`Workflow data:`, data);
    
    const startTime = Date.now();
    
    try {
      // In a real implementation, this would make an HTTP request to the n8n API
      // For our demo, we'll simulate a successful execution
      
      // Simulate random execution time between 0.5-3 seconds
      const executionTime = Math.floor(Math.random() * 2500) + 500;
      await new Promise(resolve => setTimeout(resolve, executionTime));
      
      // 90% chance of success, 10% chance of failure
      const isSuccess = Math.random() > 0.1;
      
      if (!isSuccess) {
        throw new Error("Workflow execution failed");
      }
      
      // Create a log entry for this execution
      const logEntry = {
        id: `wf-exec-${Date.now()}`,
        agentType: data.agentType,
        timestamp: new Date().toISOString(),
        status: 'success' as 'success' | 'warning' | 'error',
        message: `Executed workflow: ${workflow.name} for ${data.agentType}`,
        duration: executionTime,
        workflowId: workflow.id,
        workflowName: workflow.name,
        channel: workflow.channelType
      };
      
      // Add to logs
      this.workflowLogs = [logEntry, ...this.workflowLogs];
      
      // Update workflow status
      const updatedWorkflows = this.workflows.map(wf => {
        if (wf.id === workflow.id) {
          return {
            ...wf,
            lastRun: new Date().toISOString(),
            status: 'success' as 'success' | 'warning' | 'error'
          };
        }
        return wf;
      });
      
      this.workflows = updatedWorkflows;
      
      const endTime = Date.now();
      const executionTimeTotal = endTime - startTime;
      
      return {
        success: true,
        data: {
          executionId: `exec-${Date.now()}`,
          workflowName: workflow.name,
          timestamp: new Date().toISOString()
        },
        executionTime: executionTimeTotal,
        workflowId: workflow.id
      };
    } catch (error) {
      console.error(`Error executing workflow ${workflow.name}:`, error);
      
      // Create an error log entry
      const logEntry = {
        id: `wf-exec-${Date.now()}`,
        agentType: data.agentType,
        timestamp: new Date().toISOString(),
        status: 'error' as 'success' | 'warning' | 'error',
        message: `Failed to execute workflow: ${workflow.name} - ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration: Date.now() - startTime,
        workflowId: workflow.id,
        workflowName: workflow.name,
        channel: workflow.channelType
      };
      
      // Add to logs
      this.workflowLogs = [logEntry, ...this.workflowLogs];
      
      // Update workflow status to error
      const updatedWorkflows = this.workflows.map(wf => {
        if (wf.id === workflow.id) {
          return {
            ...wf,
            lastRun: new Date().toISOString(),
            status: 'error' as 'success' | 'warning' | 'error'
          };
        }
        return wf;
      });
      
      this.workflows = updatedWorkflows;
      
      const endTime = Date.now();
      const executionTimeTotal = endTime - startTime;
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        executionTime: executionTimeTotal,
        workflowId: workflow.id
      };
    }
  }
}

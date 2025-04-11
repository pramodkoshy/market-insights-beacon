
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
  isDataSource?: boolean;
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
  private channelDataSources: Map<string, any> = new Map();

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
      
      // First fetch data from any data source channels if they exist
      await this.fetchDataFromChannels(taskType, enhancedParams);
      
      const result = await graph.invoke(enhancedParams);
      console.log(`Task ${taskType} completed with result:`, result);
      return result;
    } catch (error) {
      console.error(`Error running task ${taskType}:`, error);
      throw error;
    }
  }

  private async fetchDataFromChannels(agentType: string, params: any): Promise<void> {
    // Get all workflows marked as data sources that are active
    const dataSources = this.workflows.filter(wf => wf.isDataSource && wf.isActive);
    
    if (dataSources.length === 0) {
      console.log("No data source channels configured, skipping data fetch");
      return;
    }
    
    console.log(`Fetching data from ${dataSources.length} channel sources for ${agentType} agent`);
    
    try {
      // Execute all data source workflows in parallel
      const results = await Promise.all(
        dataSources.map(workflow => this.executeN8nWorkflow(workflow, {
          fetchData: true,
          agentType: agentType,
          timestamp: new Date().toISOString(),
          params: params
        }))
      );
      
      // Store the channel data in our map (keyed by channel type)
      results.forEach((result, index) => {
        if (result.success && result.data) {
          const workflow = dataSources[index];
          this.channelDataSources.set(workflow.channelType, {
            lastFetched: new Date().toISOString(),
            data: result.data,
            source: workflow.name
          });
          
          console.log(`Fetched data from ${workflow.name} (${workflow.channelType}) channel`);
        }
      });
      
      // Add the channel data to the agent parameters
      if (params) {
        params.channelData = Object.fromEntries(this.channelDataSources);
        console.log(`Added channel data to agent parameters:`, 
          Array.from(this.channelDataSources.keys()));
      }
      
    } catch (error) {
      console.error("Error fetching data from channels:", error);
      // We don't throw here to allow the agent to still run even if data fetching fails
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
    
    // Clear channel data sources when workflows change
    this.channelDataSources.clear();
    
    // Log which workflows are set as data sources
    const dataSources = workflows.filter(wf => wf.isDataSource);
    if (dataSources.length > 0) {
      console.log(`${dataSources.length} workflows configured as data sources:`, 
        dataSources.map(ds => `${ds.name} (${ds.channelType})`));
    }
  }
  
  getWorkflows(): N8nWorkflow[] {
    return this.workflows;
  }
  
  getWorkflowLogs(): any[] {
    return this.workflowLogs;
  }
  
  getChannelData(channelType: string): any {
    return this.channelDataSources.get(channelType);
  }
  
  getAllChannelData(): Record<string, any> {
    return Object.fromEntries(this.channelDataSources);
  }
  
  async executeN8nWorkflow(workflow: N8nWorkflow, data: any): Promise<WorkflowExecutionResult> {
    console.log(`Executing n8n workflow: ${workflow.name} (ID: ${workflow.id})`);
    console.log(`Workflow data:`, data);
    
    const startTime = Date.now();
    const isFetchingData = data.fetchData === true;
    
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
      
      // Generate dummy data if this is a data fetch operation
      let responseData = null;
      if (isFetchingData) {
        responseData = this.generateChannelData(workflow.channelType);
      } else {
        responseData = {
          executionId: `exec-${Date.now()}`,
          workflowName: workflow.name,
          timestamp: new Date().toISOString()
        };
      }
      
      // Create a log entry for this execution
      const logEntry = {
        id: `wf-exec-${Date.now()}`,
        agentType: data.agentType,
        timestamp: new Date().toISOString(),
        status: 'success' as 'success' | 'warning' | 'error',
        message: isFetchingData 
          ? `Fetched data from channel: ${workflow.name}` 
          : `Executed workflow: ${workflow.name} for ${data.agentType}`,
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
        data: responseData,
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
        message: isFetchingData
          ? `Failed to fetch data from channel: ${workflow.name} - ${error instanceof Error ? error.message : 'Unknown error'}`
          : `Failed to execute workflow: ${workflow.name} - ${error instanceof Error ? error.message : 'Unknown error'}`,
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

  // Generate fake data based on channel type
  private generateChannelData(channelType: string): any {
    switch (channelType) {
      case 'email':
        return {
          deliveryRate: Math.round(Math.random() * 30 + 70),
          openRate: Math.round(Math.random() * 40 + 20),
          clickRate: Math.round(Math.random() * 15 + 5),
          campaigns: Math.round(Math.random() * 20 + 5),
          subscribers: Math.round(Math.random() * 10000 + 5000),
          unsubscribeRate: Math.round(Math.random() * 3 * 10) / 10,
          recentSubjects: [
            "Special Offer Just For You",
            "Your Weekly Newsletter",
            "Product Update Announcement",
            "Exclusive Member Discount"
          ]
        };
      case 'social':
        return {
          engagement: Math.round(Math.random() * 25 + 5),
          followers: Math.round(Math.random() * 50000 + 10000),
          growth: Math.round(Math.random() * 15 + 2),
          postFrequency: Math.round(Math.random() * 5 + 1),
          topPlatforms: ["Instagram", "Twitter", "Facebook", "LinkedIn"],
          sentimentScore: Math.round(Math.random() * 50 + 50),
          recentHashtags: [
            "#MarketingTips",
            "#IndustryNews",
            "#ProductLaunch",
            "#CustomerStories"
          ]
        };
      case 'ads':
        return {
          cpc: Math.round(Math.random() * 300 + 50) / 100,
          ctr: Math.round(Math.random() * 500 + 100) / 100,
          conversion: Math.round(Math.random() * 800 + 100) / 100,
          spend: Math.round(Math.random() * 10000 + 1000),
          impressions: Math.round(Math.random() * 100000 + 50000),
          channels: ["Search", "Display", "Social", "Video"],
          topKeywords: [
            "industry solutions",
            "best services",
            "affordable products",
            "expert consultation"
          ]
        };
      case 'crm':
        return {
          leads: Math.round(Math.random() * 1000 + 200),
          opportunities: Math.round(Math.random() * 300 + 50),
          conversionRate: Math.round(Math.random() * 30 + 10),
          avgDealSize: Math.round(Math.random() * 5000 + 1000),
          salesCycle: Math.round(Math.random() * 30 + 15),
          customerRetention: Math.round(Math.random() * 30 + 60),
          segments: [
            "Enterprise",
            "Mid-Market",
            "Small Business",
            "Startup"
          ]
        };
      case 'analytics':
        return {
          visitors: Math.round(Math.random() * 50000 + 10000),
          pageviews: Math.round(Math.random() * 150000 + 30000),
          bounceRate: Math.round(Math.random() * 30 + 30),
          avgSessionTime: Math.round(Math.random() * 180 + 60),
          conversionPoints: ["Signup", "Download", "Purchase", "Contact"],
          topSources: ["Organic", "Direct", "Referral", "Social"],
          deviceUsage: {
            mobile: Math.round(Math.random() * 50 + 30),
            desktop: Math.round(Math.random() * 40 + 20),
            tablet: Math.round(Math.random() * 20 + 5)
          }
        };
      case 'ecommerce':
        return {
          sales: Math.round(Math.random() * 50000 + 10000),
          aov: Math.round(Math.random() * 150 + 50),
          cartAbandonment: Math.round(Math.random() * 30 + 60),
          repeatPurchase: Math.round(Math.random() * 40 + 20),
          topProducts: [
            "Premium Subscription",
            "Starter Package",
            "Professional Services",
            "Enterprise Solution"
          ],
          customerLocations: ["North America", "Europe", "Asia", "Australia"],
          purchaseFrequency: Math.round(Math.random() * 90 + 30)
        };
      default:
        return {
          dataPoints: Math.round(Math.random() * 1000 + 500),
          metrics: ["Engagement", "Conversion", "Retention", "Growth"],
          timestamp: new Date().toISOString(),
          channelType
        };
    }
  }
}

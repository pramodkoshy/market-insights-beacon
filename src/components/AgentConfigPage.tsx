import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TopNavigation } from './TopNavigation';
import { AgentProvider, useAgents } from '@/agents/AgentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, RefreshCw, Settings, Network } from 'lucide-react';
import { toast } from 'sonner';
import { AgentStatusIndicator } from './AgentStatusIndicator';
import { N8nWorkflowConfig } from './N8nWorkflowConfig';

function AgentConfigContent() {
  const { isInitialized, isProcessing, runAllAgents, latestResults } = useAgents();
  const [activeTab, setActiveTab] = useState('general');
  const [agentFrequency, setAgentFrequency] = useState("medium");
  const [enableLogging, setEnableLogging] = useState(true);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);

  const handleRunAgents = async () => {
    toast.info("Running all agents...", {
      description: "This may take a moment.",
    });
    
    try {
      const results = await runAllAgents({
        configSource: "manual",
        timestamp: new Date().toISOString(),
        loggingEnabled: enableLogging
      });
      
      console.log("All agents completed successfully:", results);
      
      toast.success("All agents completed successfully!", {
        description: "Check the results in the respective dashboard sections.",
      });
    } catch (error) {
      console.error("Error running agents:", error);
      toast.error("Error running agents", {
        description: error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  };

  const handleWorkflowChange = (workflows) => {
    console.log("Workflows configuration updated:", workflows);
  };

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="integrations">Channel Integrations</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Bot className="h-5 w-5 mr-2" />
                  Agent Status
                </CardTitle>
                <CardDescription>Current agent status and activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="agent-status">System Status</Label>
                      <AgentStatusIndicator />
                    </div>
                    <div className="h-12 flex items-center space-x-2">
                      <Button 
                        onClick={handleRunAgents}
                        disabled={!isInitialized || isProcessing}
                        className="flex items-center"
                      >
                        <RefreshCw className={`h-4 w-4 mr-2 ${isProcessing ? 'animate-spin' : ''}`} />
                        Run All Agents
                      </Button>
                      {isProcessing && <span className="text-sm text-muted-foreground">Processing...</span>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Agent Settings
                </CardTitle>
                <CardDescription>Configure agent behavior</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="agent-frequency">Update Frequency</Label>
                    <Select value={agentFrequency} onValueChange={setAgentFrequency}>
                      <SelectTrigger id="agent-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High (Every 30 seconds)</SelectItem>
                        <SelectItem value="medium">Medium (Every minute)</SelectItem>
                        <SelectItem value="low">Low (Every 5 minutes)</SelectItem>
                        <SelectItem value="manual">Manual Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enable-logging">Enable Logging</Label>
                    <Switch
                      id="enable-logging"
                      checked={enableLogging}
                      onCheckedChange={setEnableLogging}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-refresh">Auto-refresh UI</Label>
                    <Switch
                      id="auto-refresh"
                      checked={isAutoRefresh}
                      onCheckedChange={setIsAutoRefresh}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Agent Parameters</CardTitle>
                <CardDescription>Configure specific agent parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="analysis-depth">Analysis Depth</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger id="analysis-depth">
                        <SelectValue placeholder="Select depth" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="detailed">Detailed</SelectItem>
                        <SelectItem value="comprehensive">Comprehensive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="data-source-priority">Data Source Priority</Label>
                    <Select defaultValue="balanced">
                      <SelectTrigger id="data-source-priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Recent First</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="comprehensive">Comprehensive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="market" className="mt-6">
            <TabsList>
              <TabsTrigger value="market">Market Trends</TabsTrigger>
              <TabsTrigger value="campaign">Campaign Performance</TabsTrigger>
              <TabsTrigger value="customer">Customer Segmentation</TabsTrigger>
              <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
            </TabsList>
            
            {["market", "campaign", "customer", "roi"].map((agentType) => (
              <TabsContent key={agentType} value={agentType} className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="capitalize">{agentType} Agent Configuration</CardTitle>
                    <CardDescription>Configure specific parameters for this agent</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${agentType}-data-sources`}>Data Sources</Label>
                        <Select defaultValue="all">
                          <SelectTrigger id={`${agentType}-data-sources`}>
                            <SelectValue placeholder="Select data sources" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Sources</SelectItem>
                            <SelectItem value="internal">Internal Only</SelectItem>
                            <SelectItem value="external">External Only</SelectItem>
                            <SelectItem value="custom">Custom Selection</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`${agentType}-timeframe`}>Analysis Timeframe</Label>
                        <Select defaultValue="30d">
                          <SelectTrigger id={`${agentType}-timeframe`}>
                            <SelectValue placeholder="Select timeframe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7d">Last 7 days</SelectItem>
                            <SelectItem value="30d">Last 30 days</SelectItem>
                            <SelectItem value="90d">Last 90 days</SelectItem>
                            <SelectItem value="1y">Last year</SelectItem>
                            <SelectItem value="custom">Custom Range</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`${agentType}-custom-params`}>Custom Parameters (JSON)</Label>
                      <Input 
                        id={`${agentType}-custom-params`} 
                        placeholder='{"key": "value"}'
                      />
                    </div>
                    
                    <Button 
                      className="w-full"
                      onClick={() => {
                        console.log(`Running ${agentType} agent with custom parameters`);
                        toast.info(`Running ${agentType} agent`, {
                          description: "Agent will run with custom parameters",
                        });
                      }}
                    >
                      Run {agentType.charAt(0).toUpperCase() + agentType.slice(1)} Agent
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-4">
          <N8nWorkflowConfig onWorkflowChange={handleWorkflowChange} />
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Network className="h-5 w-5 mr-2" />
                Advanced Agent Settings
              </CardTitle>
              <CardDescription>
                Configure advanced settings for your agent system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="agent-concurrency">Maximum Concurrent Agents</Label>
                <Select defaultValue="3">
                  <SelectTrigger id="agent-concurrency">
                    <SelectValue placeholder="Select concurrency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 (Low Resource Usage)</SelectItem>
                    <SelectItem value="3">3 (Balanced)</SelectItem>
                    <SelectItem value="5">5 (High Performance)</SelectItem>
                    <SelectItem value="10">10 (Maximum Performance)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Controls how many agents can run simultaneously
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="error-handling">Error Handling Strategy</Label>
                <Select defaultValue="retry">
                  <SelectTrigger id="error-handling">
                    <SelectValue placeholder="Select strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retry">Retry (3 attempts)</SelectItem>
                    <SelectItem value="fallback">Use Fallback Data</SelectItem>
                    <SelectItem value="abort">Abort on Error</SelectItem>
                    <SelectItem value="ignore">Ignore Errors</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="system-timeout">System Timeout (seconds)</Label>
                <Input 
                  id="system-timeout" 
                  type="number" 
                  defaultValue="120"
                  min="30"
                  max="600"
                />
                <p className="text-sm text-muted-foreground">
                  Maximum time allowed for any agent operation
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="debug-mode">Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable verbose logging for troubleshooting
                  </p>
                </div>
                <Switch id="debug-mode" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="offline-mode">Offline Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Run with cached data when network is unavailable
                  </p>
                </div>
                <Switch id="offline-mode" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}

export function AgentConfigPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavigation />
      
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Agent Configuration</h2>
        </div>
        
        <AgentProvider>
          <AgentConfigContent />
        </AgentProvider>
      </div>
    </div>
  );
}

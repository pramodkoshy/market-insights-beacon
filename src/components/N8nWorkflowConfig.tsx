
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { RotateCw, Plus, Workflow, Share2, Key, Save, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AgentLogsTable } from './AgentLogsTable';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const channelTypes = [
  { id: 'email', name: 'Email Marketing', icon: '📧' },
  { id: 'social', name: 'Social Media', icon: '👥' },
  { id: 'sms', name: 'SMS/Text', icon: '📱' },
  { id: 'web', name: 'Website/Landing Pages', icon: '🌐' },
  { id: 'push', name: 'Push Notifications', icon: '📲' },
  { id: 'chat', name: 'Chat/Messaging', icon: '💬' },
  { id: 'ads', name: 'Paid Advertising', icon: '💰' },
  { id: 'crm', name: 'CRM Integration', icon: '🔄' },
];

// Sample workflow logs
const generateWorkflowLogs = (count = 10) => {
  const logs = [];
  const statuses = ['success', 'warning', 'error'];
  
  for (let i = 1; i <= count; i++) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - i * 5);
    const channelType = channelTypes[Math.floor(Math.random() * channelTypes.length)];
    
    logs.push({
      id: `wf-log-${i.toString().padStart(4, '0')}`,
      agentType: ['marketTrends', 'campaignPerformance', 'customerSegmentation', 'roiAnalysis'][Math.floor(Math.random() * 4)],
      timestamp: date.toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)] as 'success' | 'warning' | 'error',
      message: `Processed ${channelType.name} workflow #${Math.floor(Math.random() * 1000)}`,
      duration: Math.floor(Math.random() * 8000) + 500,
      workflowId: `wf-${Math.floor(Math.random() * 1000)}`,
      workflowName: `${channelType.icon} ${channelType.name} Integration`,
      channel: channelType.id
    });
  }
  
  return logs;
};

const workflowSchema = z.object({
  name: z.string().min(1, "Workflow name is required"),
  channelType: z.string().min(1, "Channel type is required"),
  n8nUrl: z.string().url("Must be a valid URL"),
  apiKey: z.string().min(1, "API key is required"),
  workflowId: z.string().min(1, "Workflow ID is required"),
  isActive: z.boolean().default(true)
});

type WorkflowFormValues = z.infer<typeof workflowSchema>;

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

interface N8nWorkflowConfigProps {
  onWorkflowChange?: (workflows: N8nWorkflow[]) => void;
}

export function N8nWorkflowConfig({ onWorkflowChange }: N8nWorkflowConfigProps) {
  const [workflows, setWorkflows] = useState<N8nWorkflow[]>([
    {
      id: 'wf-001',
      name: 'Email Campaign Automation',
      channelType: 'email',
      n8nUrl: 'https://n8n.local:5678',
      apiKey: 'n8n_api_demo_key',
      workflowId: '123',
      isActive: true,
      lastRun: new Date(Date.now() - 3600000).toISOString(),
      status: 'success'
    },
    {
      id: 'wf-002',
      name: 'Social Media Posting',
      channelType: 'social',
      n8nUrl: 'https://n8n.local:5678',
      apiKey: 'n8n_api_demo_key',
      workflowId: '456',
      isActive: true,
      lastRun: new Date(Date.now() - 7200000).toISOString(),
      status: 'warning'
    }
  ]);
  
  const [logs, setLogs] = useState(generateWorkflowLogs());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<N8nWorkflow | null>(null);
  const [n8nBaseUrl, setN8nBaseUrl] = useState('http://localhost:5678');
  
  const form = useForm<WorkflowFormValues>({
    resolver: zodResolver(workflowSchema),
    defaultValues: {
      name: '',
      channelType: '',
      n8nUrl: n8nBaseUrl,
      apiKey: '',
      workflowId: '',
      isActive: true
    }
  });

  const handleAddWorkflow = () => {
    setIsAddDialogOpen(true);
    form.reset({
      name: '',
      channelType: '',
      n8nUrl: n8nBaseUrl,
      apiKey: '',
      workflowId: '',
      isActive: true
    });
  };

  const handleSaveWorkflow = (data: WorkflowFormValues) => {
    const newWorkflow: N8nWorkflow = {
      id: `wf-${Date.now().toString().slice(-3)}`,
      ...data
    };
    
    const updatedWorkflows = [...workflows, newWorkflow];
    setWorkflows(updatedWorkflows);
    setIsAddDialogOpen(false);
    
    if (onWorkflowChange) {
      onWorkflowChange(updatedWorkflows);
    }
    
    toast.success('Workflow added successfully!', {
      description: `${newWorkflow.name} has been configured.`
    });
  };

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    try {
      // Simulate testing connection to n8n
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Connection successful!', {
        description: 'Successfully connected to n8n server and verified workflow.'
      });
    } catch (error) {
      toast.error('Connection failed', {
        description: 'Could not connect to n8n server. Please check your settings.'
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleToggleWorkflow = (workflowId: string) => {
    const updatedWorkflows = workflows.map(wf => {
      if (wf.id === workflowId) {
        return { ...wf, isActive: !wf.isActive };
      }
      return wf;
    });
    
    setWorkflows(updatedWorkflows);
    
    if (onWorkflowChange) {
      onWorkflowChange(updatedWorkflows);
    }
    
    const workflow = workflows.find(wf => wf.id === workflowId);
    const newStatus = !workflow?.isActive;
    
    toast.success(
      newStatus 
        ? 'Workflow activated' 
        : 'Workflow deactivated', 
      {
        description: `${workflow?.name} is now ${newStatus ? 'active' : 'inactive'}`
      }
    );
  };

  const handleRunWorkflow = async (workflow: N8nWorkflow) => {
    setIsRunning(true);
    setSelectedWorkflow(workflow);
    
    try {
      // Simulate running workflow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add a new log entry
      const newLog = {
        id: `wf-log-${Date.now()}`,
        agentType: 'campaignPerformance',
        timestamp: new Date().toISOString(),
        status: 'success' as 'success' | 'warning' | 'error',
        message: `Manually executed workflow: ${workflow.name}`,
        duration: Math.floor(Math.random() * 3000) + 500,
        workflowId: workflow.id,
        workflowName: workflow.name,
        channel: workflow.channelType
      };
      
      setLogs([newLog, ...logs]);
      
      // Update workflow status
      const updatedWorkflows = workflows.map(wf => {
        if (wf.id === workflow.id) {
          return {
            ...wf,
            lastRun: new Date().toISOString(),
            status: 'success' as 'success' | 'warning' | 'error'
          };
        }
        return wf;
      });
      
      setWorkflows(updatedWorkflows);
      
      if (onWorkflowChange) {
        onWorkflowChange(updatedWorkflows);
      }
      
      toast.success('Workflow executed successfully!', {
        description: `${workflow.name} completed in ${newLog.duration}ms`
      });
    } catch (error) {
      toast.error('Workflow execution failed', {
        description: 'Could not execute the workflow. Please check n8n logs.'
      });
    } finally {
      setIsRunning(false);
      setSelectedWorkflow(null);
    }
  };

  const handleDeleteWorkflow = (workflowId: string) => {
    const workflow = workflows.find(wf => wf.id === workflowId);
    const updatedWorkflows = workflows.filter(wf => wf.id !== workflowId);
    
    setWorkflows(updatedWorkflows);
    
    if (onWorkflowChange) {
      onWorkflowChange(updatedWorkflows);
    }
    
    toast.success('Workflow removed', {
      description: `${workflow?.name} has been removed from your configuration`
    });
  };

  const getChannelIcon = (channelType: string) => {
    const channel = channelTypes.find(c => c.id === channelType);
    return channel ? channel.icon : '🔌';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Workflow className="h-5 w-5" />
              <span>n8n Workflow Configuration</span>
            </div>
            <Button onClick={handleAddWorkflow}>
              <Plus className="h-4 w-4 mr-2" />
              Add Workflow
            </Button>
          </CardTitle>
          <CardDescription>
            Connect your agents to execute n8n workflows across different marketing channels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="n8n-base-url">n8n Base URL</Label>
                <div className="flex gap-2 mt-2">
                  <Input 
                    id="n8n-base-url" 
                    value={n8nBaseUrl} 
                    onChange={(e) => setN8nBaseUrl(e.target.value)}
                    placeholder="http://localhost:5678" 
                    className="w-80"
                  />
                  <Button variant="outline" onClick={handleTestConnection} disabled={isTestingConnection}>
                    {isTestingConnection ? (
                      <>
                        <RotateCw className="h-4 w-4 mr-2 animate-spin" />
                        Testing...
                      </>
                    ) : (
                      'Test Connection'
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  This is the base URL where your n8n instance is running
                </p>
              </div>
              
              <div>
                <a 
                  href="https://n8n.io/pricing/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Get n8n Self-Hosted Edition
                </a>
              </div>
            </div>
            
            <div className="rounded-md border mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead>Workflow ID</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workflows.length > 0 ? (
                    workflows.map(workflow => (
                      <TableRow key={workflow.id}>
                        <TableCell className="font-medium">{workflow.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span>{getChannelIcon(workflow.channelType)}</span>
                            <span>{channelTypes.find(c => c.id === workflow.channelType)?.name || workflow.channelType}</span>
                          </div>
                        </TableCell>
                        <TableCell>{workflow.workflowId}</TableCell>
                        <TableCell>
                          {workflow.lastRun 
                            ? new Date(workflow.lastRun).toLocaleString() 
                            : 'Never'}
                        </TableCell>
                        <TableCell>
                          {workflow.status && (
                            <Badge 
                              variant={
                                workflow.status === 'success' 
                                  ? 'success' 
                                  : workflow.status === 'warning'
                                    ? 'warning'
                                    : 'destructive'
                              }
                              className="capitalize"
                            >
                              {workflow.status}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Switch 
                            checked={workflow.isActive} 
                            onCheckedChange={() => handleToggleWorkflow(workflow.id)}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleRunWorkflow(workflow)} 
                              disabled={isRunning || !workflow.isActive}
                            >
                              {isRunning && selectedWorkflow?.id === workflow.id ? (
                                <RotateCw className="h-4 w-4 mr-1 animate-spin" />
                              ) : (
                                <RotateCw className="h-4 w-4 mr-1" />
                              )}
                              Run
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDeleteWorkflow(workflow.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        No workflows configured yet. 
                        <Button variant="link" onClick={handleAddWorkflow} className="px-1 py-0 h-auto">
                          Add your first workflow
                        </Button>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Share2 className="h-5 w-5 mr-2" />
            Workflow Execution Logs
          </CardTitle>
          <CardDescription>
            View the history of workflow executions across all channels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AgentLogsTable logs={logs} limit={10} showWorkflow={true} />
        </CardContent>
      </Card>
      
      {/* Add Workflow Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add n8n Workflow Integration</DialogTitle>
            <DialogDescription>
              Configure a new n8n workflow to connect with your marketing agents
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSaveWorkflow)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workflow Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Email Campaign Automation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="channelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Channel Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select channel type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {channelTypes.map(channel => (
                          <SelectItem key={channel.id} value={channel.id}>
                            <div className="flex items-center gap-2">
                              <span>{channel.icon}</span>
                              <span>{channel.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="n8nUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>n8n URL</FormLabel>
                    <FormControl>
                      <Input placeholder="http://localhost:5678" {...field} />
                    </FormControl>
                    <FormDescription>
                      The URL where your n8n instance is running
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <FormControl>
                        <Input placeholder="n8n_api_..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="workflowId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workflow ID</FormLabel>
                      <FormControl>
                        <Input placeholder="123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Activate Workflow
                      </FormLabel>
                      <FormDescription>
                        Enable this workflow for immediate use
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Save Workflow
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

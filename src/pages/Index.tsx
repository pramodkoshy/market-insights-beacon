
import React, { useState } from 'react';
import { 
  BarChart, 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  FileText,
  Settings, 
  HelpCircle,
  Plus,
  Edit,
  Sliders
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Dashboard from '@/components/Dashboard';
import { useIsMobile } from '@/hooks/use-mobile';
import { AgentProvider } from '@/agents/AgentContext';
import { AgentStatusIndicator } from '@/components/AgentStatusIndicator';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAgents } from '@/agents/AgentContext';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const entitySchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  type: z.enum(["campaign", "customer", "report"]),
});

const agentConfigSchema = z.object({
  industryFocus: z.string().optional(),
  timeframe: z.string().optional(),
  segment: z.string().optional(),
  reportName: z.string().optional(),
  campaignName: z.string().optional(),
  customerId: z.string().optional(),
  campaignId: z.string().optional(),
  reportId: z.string().optional(),
});

const formSchema = entitySchema.merge(z.object({
  agentConfig: agentConfigSchema
}));

const Index = () => {
  const { toast: uiToast } = useToast();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEntity, setCurrentEntity] = useState(null);
  const [entities, setEntities] = useState({
    campaigns: [],
    customers: [],
    reports: []
  });
  const { isProcessing, runAllAgents, triggerTask } = useAgents();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "campaign",
      agentConfig: {
        industryFocus: "",
        timeframe: "monthly",
        segment: "",
        reportName: "",
        campaignName: "",
        customerId: "",
        campaignId: "",
        reportId: "",
      }
    },
  });

  const resetForm = () => {
    form.reset({
      name: "",
      type: "campaign",
      agentConfig: {
        industryFocus: "",
        timeframe: "monthly",
        segment: "",
        reportName: "",
        campaignName: "",
        customerId: "",
        campaignId: "",
        reportId: "",
      }
    });
  };

  const openEditDialog = (entity) => {
    setEditMode(true);
    setCurrentEntity(entity);
    
    // Set form values based on the selected entity
    const agentConfig = {};
    
    // Set specific agent config fields based on entity type
    if (entity.type === 'campaign') {
      agentConfig.campaignName = entity.name;
      agentConfig.campaignId = entity.id;
    } else if (entity.type === 'customer') {
      agentConfig.segment = entity.segment || 'high-value';
      agentConfig.customerId = entity.id;
    } else if (entity.type === 'report') {
      agentConfig.reportName = entity.name;
      agentConfig.reportId = entity.id;
      agentConfig.industryFocus = entity.industry || 'technology';
    }
    
    // Fill any other saved config values if they exist
    if (entity.agentConfig) {
      Object.keys(entity.agentConfig).forEach(key => {
        agentConfig[key] = entity.agentConfig[key];
      });
    }
    
    form.reset({
      name: entity.name,
      type: entity.type,
      agentConfig
    });
    
    setDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditMode(false);
    setCurrentEntity(null);
    resetForm();
    setDialogOpen(true);
  };

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: "/", active: true },
    { label: 'Campaigns', icon: BarChart, path: "/campaigns", active: false },
    { label: 'Customers', icon: Users, path: "/customers", active: false },
    { label: 'ROI Analysis', icon: TrendingUp, path: "/roi", active: false },
    { label: 'Reports', icon: FileText, path: "/reports", active: false },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    toast(`Navigated to ${path}`);
  };

  const onSubmit = (values) => {
    if (editMode && currentEntity) {
      // Update existing entity
      const updatedEntity = {
        ...currentEntity,
        name: values.name,
        type: values.type,
        agentConfig: values.agentConfig,
        updatedAt: new Date().toISOString()
      };
      
      // Update the appropriate entity list
      setEntities(prev => {
        if (values.type === 'campaign') {
          const campaigns = prev.campaigns.map(e => e.id === currentEntity.id ? updatedEntity : e);
          return { ...prev, campaigns };
        } else if (values.type === 'customer') {
          const customers = prev.customers.map(e => e.id === currentEntity.id ? updatedEntity : e);
          return { ...prev, customers };
        } else if (values.type === 'report') {
          const reports = prev.reports.map(e => e.id === currentEntity.id ? updatedEntity : e);
          return { ...prev, reports };
        }
        return prev;
      });
      
      toast.success(`Updated ${values.type}: ${values.name}`);
    } else {
      // Create a new entity
      const newEntity = {
        id: Date.now().toString(),
        name: values.name,
        type: values.type,
        agentConfig: values.agentConfig,
        createdAt: new Date().toISOString()
      };
      
      // Update the appropriate entity list
      setEntities(prev => {
        if (values.type === 'campaign') {
          return { ...prev, campaigns: [...prev.campaigns, newEntity] };
        } else if (values.type === 'customer') {
          return { ...prev, customers: [...prev.customers, newEntity] };
        } else if (values.type === 'report') {
          return { ...prev, reports: [...prev.reports, newEntity] };
        }
        return prev;
      });
      
      toast.success(`Created new ${values.type}: ${values.name}`);
    }
    
    form.reset();
    setDialogOpen(false);

    // Trigger relevant agent based on entity type with the agent config
    const agentType = values.type === 'campaign' ? 'campaignPerformance' : 
                      values.type === 'customer' ? 'customerSegmentation' : 
                      'marketTrends';
    
    triggerTask(agentType, values.agentConfig);
  };
  
  const getAgentConfigFields = (type) => {
    if (type === 'campaign') {
      return (
        <>
          <FormField
            control={form.control}
            name="agentConfig.campaignName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaign Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter campaign name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="agentConfig.timeframe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Timeframe</FormLabel>
                <FormControl>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      );
    } else if (type === 'customer') {
      return (
        <>
          <FormField
            control={form.control}
            name="agentConfig.segment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Segment</FormLabel>
                <FormControl>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  >
                    <option value="high-value">High Value</option>
                    <option value="mid-tier">Mid Tier</option>
                    <option value="low-engagement">Low Engagement</option>
                    <option value="new">New Customer</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      );
    } else if (type === 'report') {
      return (
        <>
          <FormField
            control={form.control}
            name="agentConfig.industryFocus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry Focus</FormLabel>
                <FormControl>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  >
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="agentConfig.timeframe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Timeframe</FormLabel>
                <FormControl>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      );
    }
    
    return null;
  };

  // Watch for type changes to update form fields
  const entityType = form.watch("type");

  return (
    <AgentProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="min-h-screen flex w-full bg-background">
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center space-x-2 px-4 pt-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <BarChart className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-sidebar-foreground">MarketInsights</span>
              </div>
              <SidebarTrigger className="absolute right-2 top-2 md:hidden" />
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {navItems.map((item) => (
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton 
                          isActive={window.location.pathname === item.path}
                          tooltip={item.label}
                          onClick={() => handleNavigation(item.path)}
                        >
                          <item.icon className="mr-2 h-5 w-5" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Actions</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                          <SidebarMenuButton onClick={openCreateDialog}>
                            <Plus className="mr-2 h-5 w-5" />
                            <span>Create New</span>
                          </SidebarMenuButton>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>{editMode ? 'Edit Entity' : 'Create New Entity'}</DialogTitle>
                            <DialogDescription>
                              {editMode ? 'Modify this entity in your marketing dashboard.' : 'Add a new entity to your marketing dashboard.'}
                            </DialogDescription>
                          </DialogHeader>
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                              <Tabs defaultValue="entity" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                  <TabsTrigger value="entity">Entity Details</TabsTrigger>
                                  <TabsTrigger value="config">Agent Configuration</TabsTrigger>
                                </TabsList>
                                
                                <TabsContent value="entity" className="space-y-4 pt-4">
                                  <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                          <Input placeholder="Enter name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <FormControl>
                                          <select 
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            {...field}
                                            disabled={editMode}
                                          >
                                            <option value="campaign">Campaign</option>
                                            <option value="customer">Customer</option>
                                            <option value="report">Report</option>
                                          </select>
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </TabsContent>
                                
                                <TabsContent value="config" className="space-y-4 pt-4">
                                  {getAgentConfigFields(entityType)}
                                </TabsContent>
                              </Tabs>
                              
                              <DialogFooter>
                                <Button type="submit" disabled={isProcessing}>
                                  {isProcessing ? 'Processing...' : editMode ? 'Update' : 'Create'}
                                </Button>
                              </DialogFooter>
                            </form>
                          </Form>
                        </DialogContent>
                      </Dialog>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => {
                          toast.info("Running all agents...");
                          runAllAgents();
                        }}
                        disabled={isProcessing}
                      >
                        <TrendingUp className="mr-2 h-5 w-5" />
                        <span>{isProcessing ? 'Processing...' : 'Run Analysis'}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              {entities.campaigns.length > 0 && (
                <SidebarGroup>
                  <SidebarGroupLabel>Campaigns</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {entities.campaigns.map((campaign) => (
                        <SidebarMenuItem key={campaign.id} className="group">
                          <SidebarMenuButton onClick={() => {
                            toast.info(`Viewing campaign: ${campaign.name}`);
                            triggerTask('campaignPerformance', { 
                              ...(campaign.agentConfig || {}),
                              campaignId: campaign.id,
                              campaignName: campaign.name 
                            });
                          }}>
                            <BarChart className="mr-2 h-5 w-5" />
                            <span>{campaign.name}</span>
                          </SidebarMenuButton>
                          <button 
                            onClick={() => openEditDialog(campaign)}
                            className="absolute right-1 top-1.5 flex h-7 w-7 items-center justify-center rounded-md p-0 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </button>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              )}

              {entities.customers.length > 0 && (
                <SidebarGroup>
                  <SidebarGroupLabel>Customers</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {entities.customers.map((customer) => (
                        <SidebarMenuItem key={customer.id} className="group">
                          <SidebarMenuButton onClick={() => {
                            toast.info(`Viewing customer: ${customer.name}`);
                            triggerTask('customerSegmentation', {
                              ...(customer.agentConfig || {}),
                              customerId: customer.id,
                              customerName: customer.name,
                              segment: customer.agentConfig?.segment || 'high-value'
                            });
                          }}>
                            <Users className="mr-2 h-5 w-5" />
                            <span>{customer.name}</span>
                          </SidebarMenuButton>
                          <button 
                            onClick={() => openEditDialog(customer)}
                            className="absolute right-1 top-1.5 flex h-7 w-7 items-center justify-center rounded-md p-0 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </button>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              )}

              {entities.reports.length > 0 && (
                <SidebarGroup>
                  <SidebarGroupLabel>Reports</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {entities.reports.map((report) => (
                        <SidebarMenuItem key={report.id} className="group">
                          <SidebarMenuButton onClick={() => {
                            toast.info(`Viewing report: ${report.name}`);
                            triggerTask('marketTrends', {
                              ...(report.agentConfig || {}),
                              reportId: report.id,
                              reportName: report.name,
                              industry: report.agentConfig?.industryFocus || 'technology'
                            });
                          }}>
                            <FileText className="mr-2 h-5 w-5" />
                            <span>{report.name}</span>
                          </SidebarMenuButton>
                          <button 
                            onClick={() => openEditDialog(report)}
                            className="absolute right-1 top-1.5 flex h-7 w-7 items-center justify-center rounded-md p-0 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </button>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              )}
            </SidebarContent>
            
            <SidebarFooter className="mt-auto">
              <AgentStatusIndicator />
              
              <Card className="bg-sidebar-accent text-sidebar-accent-foreground m-2">
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full bg-sidebar-accent-foreground h-8 w-8 flex items-center justify-center">
                      <span className="text-sidebar-accent text-xs font-bold">JS</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">John Smith</span>
                      <span className="text-xs">Marketing Admin</span>
                    </div>
                  </div>
                </div>
              </Card>
            </SidebarFooter>
          </Sidebar>
          
          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <Dashboard />
          </div>
        </div>
      </SidebarProvider>
    </AgentProvider>
  );
};

export default Index;

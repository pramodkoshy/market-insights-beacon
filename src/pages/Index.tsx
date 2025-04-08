
import React, { useState } from 'react';
import { 
  BarChart, 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  FileText,
  Settings, 
  HelpCircle,
  Plus
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const createEntitySchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  type: z.enum(["campaign", "customer", "report"]),
});

const Index = () => {
  const { toast: uiToast } = useToast();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [entities, setEntities] = useState({
    campaigns: [],
    customers: [],
    reports: []
  });
  const { isProcessing, runAllAgents, triggerTask } = useAgents();

  const form = useForm({
    resolver: zodResolver(createEntitySchema),
    defaultValues: {
      name: "",
      type: "campaign",
    },
  });

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
    // Create a new entity based on type
    const newEntity = {
      id: Date.now().toString(),
      name: values.name,
      type: values.type,
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
    
    form.reset();
    setDialogOpen(false);

    // Trigger relevant agent based on entity type
    const agentType = values.type === 'campaign' ? 'campaignPerformance' : 
                      values.type === 'customer' ? 'customerSegmentation' : 
                      'marketTrends';
    
    triggerTask(agentType, { entityName: values.name, entityId: newEntity.id });
  };

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
                          <SidebarMenuButton>
                            <Plus className="mr-2 h-5 w-5" />
                            <span>Create New</span>
                          </SidebarMenuButton>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Create New Entity</DialogTitle>
                            <DialogDescription>
                              Add a new entity to your marketing dashboard.
                            </DialogDescription>
                          </DialogHeader>
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                              <DialogFooter>
                                <Button type="submit" disabled={isProcessing}>
                                  {isProcessing ? 'Creating...' : 'Create'}
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
                        <SidebarMenuItem key={campaign.id}>
                          <SidebarMenuButton onClick={() => {
                            toast.info(`Viewing campaign: ${campaign.name}`);
                            triggerTask('campaignPerformance', { 
                              campaignId: campaign.id,
                              campaignName: campaign.name 
                            });
                          }}>
                            <BarChart className="mr-2 h-5 w-5" />
                            <span>{campaign.name}</span>
                          </SidebarMenuButton>
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
                        <SidebarMenuItem key={customer.id}>
                          <SidebarMenuButton onClick={() => {
                            toast.info(`Viewing customer: ${customer.name}`);
                            triggerTask('customerSegmentation', {
                              customerId: customer.id,
                              customerName: customer.name,
                              segment: 'high-value'
                            });
                          }}>
                            <Users className="mr-2 h-5 w-5" />
                            <span>{customer.name}</span>
                          </SidebarMenuButton>
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
                        <SidebarMenuItem key={report.id}>
                          <SidebarMenuButton onClick={() => {
                            toast.info(`Viewing report: ${report.name}`);
                            triggerTask('marketTrends', {
                              reportId: report.id,
                              reportName: report.name,
                              industry: 'technology'
                            });
                          }}>
                            <FileText className="mr-2 h-5 w-5" />
                            <span>{report.name}</span>
                          </SidebarMenuButton>
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

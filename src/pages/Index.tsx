
import React from 'react';
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

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [newEntityName, setNewEntityName] = React.useState("");
  const [newEntityType, setNewEntityType] = React.useState("campaign");
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: "/", active: true },
    { label: 'Campaigns', icon: BarChart, path: "/campaigns", active: false },
    { label: 'Customers', icon: Users, path: "/customers", active: false },
    { label: 'ROI Analysis', icon: TrendingUp, path: "/roi", active: false },
    { label: 'Reports', icon: FileText, path: "/reports", active: false },
  ];

  const handleNavigation = (path) => {
    if (path !== "/") {
      toast({
        title: "Navigation",
        description: `This would navigate to ${path}`,
      });
    }
  };

  const handleCreateEntity = () => {
    if (!newEntityName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for the new entity",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Success",
      description: `Created new ${newEntityType}: ${newEntityName}`,
    });
    
    setNewEntityName("");
    setDialogOpen(false);
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
                          isActive={item.active}
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
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Name
                              </Label>
                              <Input 
                                id="name" 
                                value={newEntityName}
                                onChange={(e) => setNewEntityName(e.target.value)}
                                className="col-span-3" 
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="type" className="text-right">
                                Type
                              </Label>
                              <select 
                                id="type"
                                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={newEntityType}
                                onChange={(e) => setNewEntityType(e.target.value)}
                              >
                                <option value="campaign">Campaign</option>
                                <option value="customer">Customer</option>
                                <option value="report">Report</option>
                              </select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" onClick={handleCreateEntity}>Create</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
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

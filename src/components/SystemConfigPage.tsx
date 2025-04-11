
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TopNavigation } from './TopNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Database, Shield, Users, Cloud, Bell, Globe } from 'lucide-react';
import { toast } from 'sonner';

export function SystemConfigPage() {
  const handleSaveSettings = () => {
    toast.success("System settings saved successfully!");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavigation />
      
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">System Configuration</h2>
        </div>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  General Settings
                </CardTitle>
                <CardDescription>Configure global system parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="system-name">System Name</Label>
                    <Input id="system-name" defaultValue="Marketing Analytics Platform" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Default Timezone</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">Eastern Time (EST)</SelectItem>
                        <SelectItem value="cst">Central Time (CST)</SelectItem>
                        <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                        <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="mm-dd-yyyy">
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                      <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="system-language">Default Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="system-language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="enable-logging" defaultChecked />
                  <Label htmlFor="enable-logging">Enable System Logging</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="enable-metrics" defaultChecked />
                  <Label htmlFor="enable-metrics">Collect System Metrics</Label>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  Data Management
                </CardTitle>
                <CardDescription>Configure data storage and retention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="data-retention">Data Retention Period</Label>
                  <Select defaultValue="36">
                    <SelectTrigger id="data-retention">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 months</SelectItem>
                      <SelectItem value="6">6 months</SelectItem>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                      <SelectItem value="36">36 months</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="auto-archive" defaultChecked />
                  <Label htmlFor="auto-archive">Enable Automatic Data Archiving</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="data-backup" defaultChecked />
                  <Label htmlFor="data-backup">Enable Daily Backups</Label>
                </div>
              </CardContent>
            </Card>
            
            <Button onClick={handleSaveSettings} className="w-full">Save System Settings</Button>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Settings
                </CardTitle>
                <CardDescription>Configure security and access control</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="auth-method">Authentication Method</Label>
                  <Select defaultValue="password">
                    <SelectTrigger id="auth-method">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="password">Username/Password</SelectItem>
                      <SelectItem value="sso">Single Sign-On (SSO)</SelectItem>
                      <SelectItem value="mfa">Multi-Factor Authentication</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="30" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="enforce-password-policy" defaultChecked />
                  <Label htmlFor="enforce-password-policy">Enforce Password Policy</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="ip-restriction" />
                  <Label htmlFor="ip-restriction">Enable IP Restrictions</Label>
                </div>
              </CardContent>
            </Card>
            
            <Button onClick={handleSaveSettings}>Save Security Settings</Button>
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Cloud className="h-5 w-5 mr-2" />
                  External Integrations
                </CardTitle>
                <CardDescription>Configure integrations with external services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium">Google Analytics</span>
                    </div>
                    <Switch id="ga-integration" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium">Facebook Ads</span>
                    </div>
                    <Switch id="fb-integration" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium">HubSpot</span>
                    </div>
                    <Switch id="hubspot-integration" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium">Salesforce</span>
                    </div>
                    <Switch id="salesforce-integration" />
                  </div>
                </div>
                
                <Button onClick={handleSaveSettings}>Save Integration Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Configure system notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Email Notifications</Label>
                  <div className="border rounded-md p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span>System Alerts</span>
                      <Switch id="email-system-alerts" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Report Generation</span>
                      <Switch id="email-reports" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>User Activity</span>
                      <Switch id="email-user-activity" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>In-App Notifications</Label>
                  <div className="border rounded-md p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span>System Updates</span>
                      <Switch id="inapp-system-updates" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Task Completion</span>
                      <Switch id="inapp-task-completion" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Mention Notifications</span>
                      <Switch id="inapp-mentions" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleSaveSettings}>Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

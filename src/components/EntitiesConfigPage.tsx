
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TopNavigation } from './TopNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Building2, Users, Database, Plus, Tag, PlusCircle, FileSpreadsheet } from 'lucide-react';
import { toast } from 'sonner';

export function EntitiesConfigPage() {
  const handleSaveEntity = () => {
    toast.success("Entity saved successfully!");
  };
  
  const handleImportEntities = () => {
    toast.info("Import functionality would connect to your data sources in a production environment");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavigation />
      
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Entities Configuration</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleImportEntities}>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Entity
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="campaigns" className="space-y-4">
          <TabsList>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>
          
          <TabsContent value="campaigns" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Tag className="h-5 w-5 mr-2" />
                  Campaign Entity Configuration
                </CardTitle>
                <CardDescription>Configure campaign entity properties and relationships</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="campaign-name-field">Name Field</Label>
                    <Input id="campaign-name-field" defaultValue="name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="campaign-id-field">ID Field</Label>
                    <Input id="campaign-id-field" defaultValue="campaign_id" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="campaign-tracking">Tracking Properties</Label>
                  <div className="border rounded-md p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span>budget</span>
                      <span className="text-sm text-muted-foreground">number</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>start_date</span>
                      <span className="text-sm text-muted-foreground">date</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>end_date</span>
                      <span className="text-sm text-muted-foreground">date</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>status</span>
                      <span className="text-sm text-muted-foreground">enum</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>channel</span>
                      <span className="text-sm text-muted-foreground">relation</span>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full mt-2">
                      <PlusCircle className="h-3.5 w-3.5 mr-1" />
                      Add Property
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Relationships</Label>
                  <div className="border rounded-md p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span>channels</span>
                      <span className="text-sm text-muted-foreground">many-to-many</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>customers</span>
                      <span className="text-sm text-muted-foreground">many-to-many</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>products</span>
                      <span className="text-sm text-muted-foreground">many-to-many</span>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full mt-2">
                      <PlusCircle className="h-3.5 w-3.5 mr-1" />
                      Add Relationship
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="auto-track-campaigns" defaultChecked />
                  <Label htmlFor="auto-track-campaigns">Automatically track campaign performance</Label>
                </div>
                
                <Button onClick={handleSaveEntity}>Save Campaign Entity Configuration</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="customers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Customer Entity Configuration
                </CardTitle>
                <CardDescription>Configure customer entity properties and relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <Label>Entity Properties</Label>
                  <div className="border rounded-md p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span>customer_id</span>
                      <span className="text-sm text-muted-foreground">unique identifier</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>name</span>
                      <span className="text-sm text-muted-foreground">string</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>email</span>
                      <span className="text-sm text-muted-foreground">string</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>segment</span>
                      <span className="text-sm text-muted-foreground">enum</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>lifetime_value</span>
                      <span className="text-sm text-muted-foreground">number</span>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full mt-2">
                      <PlusCircle className="h-3.5 w-3.5 mr-1" />
                      Add Property
                    </Button>
                  </div>
                </div>
                
                <Button onClick={handleSaveEntity}>Save Customer Entity Configuration</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="channels" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Channel Entity Configuration</CardTitle>
                <CardDescription>Configure channel entity properties and relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Define properties for marketing channels such as social media, email, search, etc.</p>
                <Button onClick={handleSaveEntity}>Save Channel Entity Configuration</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Entity Configuration</CardTitle>
                <CardDescription>Configure product entity properties and relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Define properties for products and their relationship to campaigns and customers.</p>
                <Button onClick={handleSaveEntity}>Save Product Entity Configuration</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

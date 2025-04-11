
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { TopNavigation } from './TopNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  Building2, 
  Users, 
  Database, 
  Plus, 
  Tag, 
  PlusCircle, 
  FileSpreadsheet, 
  Edit, 
  Trash2, 
  Save, 
  X,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { EntityDetailForm } from './EntityDetailForm';
import { AgentLogsTable } from './AgentLogsTable';

// Sample entity types and their properties
const entityTypes = {
  campaigns: {
    label: 'Campaigns',
    icon: <Tag className="h-5 w-5 mr-2" />,
    properties: [
      { name: 'name', type: 'string', required: true },
      { name: 'campaign_id', type: 'string', required: true },
      { name: 'budget', type: 'number' },
      { name: 'start_date', type: 'date' },
      { name: 'end_date', type: 'date' },
      { name: 'status', type: 'enum', options: ['draft', 'active', 'paused', 'completed'] },
      { name: 'channel', type: 'relation' }
    ],
    relationships: [
      { name: 'channels', type: 'many-to-many' },
      { name: 'customers', type: 'many-to-many' },
      { name: 'products', type: 'many-to-many' }
    ]
  },
  customers: {
    label: 'Customers',
    icon: <Users className="h-5 w-5 mr-2" />,
    properties: [
      { name: 'customer_id', type: 'string', required: true },
      { name: 'name', type: 'string', required: true },
      { name: 'email', type: 'string' },
      { name: 'segment', type: 'enum', options: ['high-value', 'regular', 'occasional', 'new'] },
      { name: 'lifetime_value', type: 'number' }
    ],
    relationships: [
      { name: 'campaigns', type: 'many-to-many' },
      { name: 'purchases', type: 'one-to-many' }
    ]
  },
  channels: {
    label: 'Channels',
    icon: <Building2 className="h-5 w-5 mr-2" />,
    properties: [
      { name: 'channel_id', type: 'string', required: true },
      { name: 'name', type: 'string', required: true },
      { name: 'type', type: 'enum', options: ['social', 'email', 'search', 'display', 'direct'] },
      { name: 'cost_model', type: 'enum', options: ['cpc', 'cpm', 'cpa', 'fixed'] }
    ],
    relationships: [
      { name: 'campaigns', type: 'many-to-many' }
    ]
  },
  products: {
    label: 'Products',
    icon: <Database className="h-5 w-5 mr-2" />,
    properties: [
      { name: 'product_id', type: 'string', required: true },
      { name: 'name', type: 'string', required: true },
      { name: 'category', type: 'string' },
      { name: 'price', type: 'number' },
      { name: 'inventory', type: 'number' }
    ],
    relationships: [
      { name: 'campaigns', type: 'many-to-many' },
      { name: 'customers', type: 'many-to-many' }
    ]
  }
};

// Sample entity data
const generateSampleEntities = (type, count = 20) => {
  const entities = [];
  const typeConfig = entityTypes[type];
  
  for (let i = 1; i <= count; i++) {
    const entity = {
      id: `${type.slice(0, 3)}-${i.toString().padStart(4, '0')}`,
      createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      updatedAt: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
    };
    
    typeConfig.properties.forEach(prop => {
      if (prop.name === 'name') {
        entity[prop.name] = `${typeConfig.label.slice(0, -1)} ${i}`;
      } else if (prop.type === 'string' && prop.name.includes('id')) {
        entity[prop.name] = `${prop.name.split('_')[0]}-${i.toString().padStart(4, '0')}`;
      } else if (prop.type === 'number') {
        entity[prop.name] = Math.floor(Math.random() * 1000);
      } else if (prop.type === 'date') {
        const date = new Date();
        if (prop.name === 'start_date') {
          date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        } else if (prop.name === 'end_date') {
          date.setDate(date.getDate() + Math.floor(Math.random() * 90) + 30);
        }
        entity[prop.name] = date.toISOString().split('T')[0];
      } else if (prop.type === 'enum' && prop.options) {
        const randomIndex = Math.floor(Math.random() * prop.options.length);
        entity[prop.name] = prop.options[randomIndex];
      } else if (prop.type === 'relation') {
        entity[prop.name] = `rel-${Math.floor(Math.random() * 100)}`;
      }
    });
    
    entities.push(entity);
  }
  
  return entities;
};

// Sample agent run logs
const generateSampleLogs = (count = 15) => {
  const logs = [];
  const agentTypes = ['entityValidation', 'dataSync', 'relationshipCheck'];
  const statuses = ['success', 'warning', 'error'];
  
  for (let i = 1; i <= count; i++) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - i * 15);
    
    logs.push({
      id: `log-${i.toString().padStart(4, '0')}`,
      agentType: agentTypes[Math.floor(Math.random() * agentTypes.length)],
      entityType: Object.keys(entityTypes)[Math.floor(Math.random() * Object.keys(entityTypes).length)],
      timestamp: date.toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      message: `Processed entity batch ${Math.floor(Math.random() * 100)}`,
      duration: Math.floor(Math.random() * 5000) + 500
    });
  }
  
  return logs;
};

// Form schema for entity validation
const createEntitySchema = (entityType) => {
  const typeConfig = entityTypes[entityType];
  const schema = {};
  
  typeConfig.properties.forEach(prop => {
    if (prop.type === 'string') {
      if (prop.required) {
        schema[prop.name] = z.string().min(1, { message: `${prop.name} is required` });
      } else {
        schema[prop.name] = z.string().optional();
      }
    } else if (prop.type === 'number') {
      if (prop.required) {
        schema[prop.name] = z.number({ invalid_type_error: `${prop.name} must be a number` });
      } else {
        schema[prop.name] = z.number({ invalid_type_error: `${prop.name} must be a number` }).optional();
      }
    } else if (prop.type === 'date') {
      if (prop.required) {
        schema[prop.name] = z.string().min(1, { message: `${prop.name} is required` });
      } else {
        schema[prop.name] = z.string().optional();
      }
    } else if (prop.type === 'enum') {
      if (prop.required) {
        schema[prop.name] = z.enum(prop.options);
      } else {
        schema[prop.name] = z.enum(prop.options).optional();
      }
    } else if (prop.type === 'relation') {
      if (prop.required) {
        schema[prop.name] = z.string().min(1, { message: `${prop.name} is required` });
      } else {
        schema[prop.name] = z.string().optional();
      }
    }
  });
  
  return z.object(schema);
};

export function EntitiesConfigPage() {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [entities, setEntities] = useState({});
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEntity, setCurrentEntity] = useState(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  
  const itemsPerPage = 10;
  const totalPages = Math.ceil((entities[activeTab]?.length || 0) / itemsPerPage);
  
  // Initialize entity data
  useEffect(() => {
    const initialEntities = {};
    Object.keys(entityTypes).forEach(type => {
      initialEntities[type] = generateSampleEntities(type);
    });
    setEntities(initialEntities);
    setLogs(generateSampleLogs());
  }, []);
  
  // Form setup for adding/editing entities
  const entitySchema = createEntitySchema(activeTab);
  const form = useForm({
    resolver: zodResolver(entitySchema),
    defaultValues: {}
  });
  
  // Reset form when changing tabs or when the dialog opens/closes
  useEffect(() => {
    if (isAddDialogOpen) {
      const defaultValues = {};
      entityTypes[activeTab].properties.forEach(prop => {
        defaultValues[prop.name] = '';
      });
      form.reset(defaultValues);
    } else if (isEditDialogOpen && currentEntity) {
      form.reset(currentEntity);
    }
  }, [isAddDialogOpen, isEditDialogOpen, currentEntity, activeTab, form]);
  
  const handleTabChange = (value) => {
    setActiveTab(value);
    setCurrentPage(1);
  };
  
  const handleAddEntity = () => {
    setIsAddDialogOpen(true);
  };
  
  const handleEditEntity = (entity) => {
    setCurrentEntity(entity);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteEntity = (entity) => {
    setCurrentEntity(entity);
    setIsConfirmDeleteOpen(true);
  };
  
  const confirmDelete = () => {
    if (currentEntity) {
      const updatedEntities = {
        ...entities,
        [activeTab]: entities[activeTab].filter(e => e.id !== currentEntity.id)
      };
      setEntities(updatedEntities);
      toast.success(`Entity deleted successfully!`);
      setIsConfirmDeleteOpen(false);
      
      // Add a log entry for this operation
      const newLog = {
        id: `log-${logs.length + 1}`,
        agentType: 'entityValidation',
        entityType: activeTab,
        timestamp: new Date().toISOString(),
        status: 'success',
        message: `Deleted entity ${currentEntity.name || currentEntity.id}`,
        duration: Math.floor(Math.random() * 500) + 100
      };
      setLogs([newLog, ...logs]);
    }
  };
  
  const onSubmit = (data) => {
    if (isAddDialogOpen) {
      const newEntity = {
        ...data,
        id: `${activeTab.slice(0, 3)}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const updatedEntities = {
        ...entities,
        [activeTab]: [...entities[activeTab], newEntity]
      };
      
      setEntities(updatedEntities);
      toast.success("Entity added successfully!");
      setIsAddDialogOpen(false);
      
      // Add a log entry for this operation
      const newLog = {
        id: `log-${logs.length + 1}`,
        agentType: 'entityValidation',
        entityType: activeTab,
        timestamp: new Date().toISOString(),
        status: 'success',
        message: `Created new entity ${newEntity.name || newEntity.id}`,
        duration: Math.floor(Math.random() * 500) + 100
      };
      setLogs([newLog, ...logs]);
      
    } else if (isEditDialogOpen && currentEntity) {
      const updatedEntity = {
        ...currentEntity,
        ...data,
        updatedAt: new Date().toISOString()
      };
      
      const updatedEntities = {
        ...entities,
        [activeTab]: entities[activeTab].map(e => 
          e.id === currentEntity.id ? updatedEntity : e
        )
      };
      
      setEntities(updatedEntities);
      toast.success("Entity updated successfully!");
      setIsEditDialogOpen(false);
      
      // Add a log entry for this operation
      const newLog = {
        id: `log-${logs.length + 1}`,
        agentType: 'entityValidation',
        entityType: activeTab,
        timestamp: new Date().toISOString(),
        status: 'success',
        message: `Updated entity ${updatedEntity.name || updatedEntity.id}`,
        duration: Math.floor(Math.random() * 500) + 100
      };
      setLogs([newLog, ...logs]);
    }
  };
  
  const handleImportEntities = () => {
    toast.info("Import functionality would connect to your data sources in a production environment");
  };
  
  // Get paginated entities
  const getPaginatedEntities = () => {
    if (!entities[activeTab]) return [];
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return entities[activeTab].slice(start, end);
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
            <Button onClick={handleAddEntity}>
              <Plus className="mr-2 h-4 w-4" />
              New Entity
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="campaigns" value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList>
            {Object.keys(entityTypes).map(type => (
              <TabsTrigger key={type} value={type}>
                {entityTypes[type].label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.keys(entityTypes).map(type => (
            <TabsContent key={type} value={type} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {entityTypes[type].icon}
                    {entityTypes[type].label} Entity List
                  </CardTitle>
                  <CardDescription>
                    Manage your {type} entities - add, edit, or remove items as needed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          {entityTypes[type].properties
                            .filter(prop => !['name', 'campaign_id', 'customer_id', 'channel_id', 'product_id'].includes(prop.name))
                            .slice(0, 3)
                            .map(prop => (
                              <TableHead key={prop.name}>{prop.name.replace('_', ' ')}</TableHead>
                            ))
                          }
                          <TableHead>Created</TableHead>
                          <TableHead>Updated</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getPaginatedEntities().map((entity) => (
                          <TableRow key={entity.id}>
                            <TableCell className="font-medium">{entity.id}</TableCell>
                            <TableCell>{entity.name}</TableCell>
                            {entityTypes[type].properties
                              .filter(prop => !['name', 'campaign_id', 'customer_id', 'channel_id', 'product_id'].includes(prop.name))
                              .slice(0, 3)
                              .map(prop => (
                                <TableCell key={prop.name}>
                                  {entity[prop.name] ? (
                                    prop.type === 'date' 
                                      ? new Date(entity[prop.name]).toLocaleDateString() 
                                      : entity[prop.name]
                                  ) : '-'}
                                </TableCell>
                              ))
                            }
                            <TableCell>
                              {new Date(entity.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {new Date(entity.updatedAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon" onClick={() => handleEditEntity(entity)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteEntity(entity)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {totalPages > 1 && (
                    <Pagination className="mt-4">
                      <PaginationContent>
                        <PaginationItem>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="h-9 w-9"
                          >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Previous page</span>
                          </Button>
                        </PaginationItem>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter(page => 
                            page === 1 || 
                            page === totalPages || 
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          )
                          .map((page, i, pages) => {
                            // Add ellipsis
                            if (i > 0 && pages[i] - pages[i-1] > 1) {
                              return (
                                <React.Fragment key={`ellipsis-${page}`}>
                                  <PaginationItem>
                                    <div className="flex h-9 w-9 items-center justify-center">...</div>
                                  </PaginationItem>
                                  <PaginationItem>
                                    <PaginationLink 
                                      isActive={page === currentPage}
                                      onClick={() => setCurrentPage(page)}
                                    >
                                      {page}
                                    </PaginationLink>
                                  </PaginationItem>
                                </React.Fragment>
                              );
                            }
                            
                            return (
                              <PaginationItem key={page}>
                                <PaginationLink 
                                  isActive={page === currentPage}
                                  onClick={() => setCurrentPage(page)}
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          })
                        }
                        
                        <PaginationItem>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="h-9 w-9"
                          >
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">Next page</span>
                          </Button>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Agent Run Logs</CardTitle>
                  <CardDescription>
                    View logs of agent operations related to {type} entities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AgentLogsTable 
                    logs={logs
                      .filter(log => log.entityType === type)
                      .map(log => ({
                        id: log.id,
                        timestamp: log.timestamp,
                        agentType: log.agentType,
                        status: log.status,
                        message: log.message,
                        duration: log.duration
                      }))}
                    limit={5}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      {/* Add Entity Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New {entityTypes[activeTab]?.label.slice(0, -1)}</DialogTitle>
            <DialogDescription>
              Create a new entity with the form below. Fields marked with * are required.
            </DialogDescription>
          </DialogHeader>
          
          <EntityDetailForm
            form={form}
            onSubmit={onSubmit}
            onCancel={() => setIsAddDialogOpen(false)}
            entityProperties={entityTypes[activeTab]?.properties || []}
          />
        </DialogContent>
      </Dialog>
      
      {/* Edit Entity Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit {entityTypes[activeTab]?.label.slice(0, -1)}</DialogTitle>
            <DialogDescription>
              Update the entity information. Fields marked with * are required.
            </DialogDescription>
          </DialogHeader>
          
          <EntityDetailForm
            form={form}
            onSubmit={onSubmit}
            onCancel={() => setIsEditDialogOpen(false)}
            entityProperties={entityTypes[activeTab]?.properties || []}
          />
        </DialogContent>
      </Dialog>
      
      {/* Confirm Delete Dialog */}
      <Dialog open={isConfirmDeleteOpen} onOpenChange={setIsConfirmDeleteOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this entity? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {currentEntity && (
            <div className="py-4">
              <p className="mb-2"><strong>Entity:</strong> {currentEntity.name || currentEntity.id}</p>
              <p><strong>ID:</strong> {currentEntity.id}</p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

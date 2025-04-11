
import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

interface EntityDetailFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  entityProperties: Array<{
    name: string;
    type: string;
    required?: boolean;
    options?: string[];
  }>;
}

export function EntityDetailForm({ 
  form, 
  onSubmit, 
  onCancel, 
  entityProperties 
}: EntityDetailFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {entityProperties.map(prop => (
            <FormField
              key={prop.name}
              control={form.control}
              name={prop.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {prop.name.replace('_', ' ')}
                    {prop.required && <span className="text-red-500 ml-1">*</span>}
                  </FormLabel>
                  <FormControl>
                    {prop.type === 'enum' ? (
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        value={field.value || ''}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={`Select ${prop.name}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {prop.options?.map(option => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : prop.type === 'date' ? (
                      <Input 
                        type="date" 
                        {...field} 
                      />
                    ) : prop.type === 'number' ? (
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={e => field.onChange(Number(e.target.value))}
                        value={field.value || ''}
                      />
                    ) : (
                      <Input {...field} />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}

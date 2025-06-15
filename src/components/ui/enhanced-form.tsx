
"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'number' | 'tel';
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: z.ZodType<any>;
  required?: boolean;
  description?: string;
  disabled?: boolean;
}

interface EnhancedFormProps {
  title?: string;
  description?: string;
  fields: FormField[];
  onSubmit: (data: any) => Promise<void>;
  submitLabel?: string;
  className?: string;
  showProgress?: boolean;
}

export const EnhancedForm: React.FC<EnhancedFormProps> = ({
  title,
  description,
  fields,
  onSubmit,
  submitLabel = "Submit",
  className,
  showProgress = false
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Build schema from fields
  const schemaFields: Record<string, z.ZodType<any>> = {};
  fields.forEach(field => {
    if (field.validation) {
      schemaFields[field.name] = field.validation;
    } else if (field.required) {
      switch (field.type) {
        case 'email':
          schemaFields[field.name] = z.string().email('Invalid email address');
          break;
        case 'number':
          schemaFields[field.name] = z.number().min(0, 'Must be a positive number');
          break;
        default:
          schemaFields[field.name] = z.string().min(1, `${field.label} is required`);
      }
    } else {
      schemaFields[field.name] = z.string().optional();
    }
  });

  const schema = z.object(schemaFields);

  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange'
  });

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      await onSubmit(data);
      setSubmitSuccess(true);
      form.reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const error = form.formState.errors[field.name];

    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            {...form.register(field.name)}
            placeholder={field.placeholder}
            disabled={field.disabled || isSubmitting}
            className={cn(error && "border-destructive")}
          />
        );

      case 'select':
        return (
          <Select onValueChange={(value) => form.setValue(field.name, value)}>
            <SelectTrigger className={cn(error && "border-destructive")}>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              {...form.register(field.name)}
              disabled={field.disabled || isSubmitting}
            />
            <Label htmlFor={field.name}>{field.label}</Label>
          </div>
        );

      case 'radio':
        return (
          <RadioGroup onValueChange={(value) => form.setValue(field.name, value)}>
            {field.options?.map(option => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      default:
        return (
          <Input
            {...form.register(field.name, { 
              valueAsNumber: field.type === 'number' 
            })}
            type={field.type}
            placeholder={field.placeholder}
            disabled={field.disabled || isSubmitting}
            className={cn(error && "border-destructive")}
          />
        );
    }
  };

  const progress = showProgress ? 
    (Object.keys(form.formState.dirtyFields).length / fields.length) * 100 : 0;

  return (
    <Card className={className}>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <p className="text-muted-foreground">{description}</p>}
        {showProgress && (
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {fields.map(field => (
            <div key={field.name} className="space-y-2">
              {field.type !== 'checkbox' && (
                <Label htmlFor={field.name}>
                  {field.label}
                  {field.required && <span className="text-destructive">*</span>}
                </Label>
              )}
              
              {renderField(field)}
              
              {field.description && (
                <p className="text-sm text-muted-foreground">{field.description}</p>
              )}
              
              {form.formState.errors[field.name] && (
                <p className="text-sm text-destructive">
                  {form.formState.errors[field.name]?.message as string}
                </p>
              )}
            </div>
          ))}

          {submitError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          {submitSuccess && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Form submitted successfully!</AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            disabled={isSubmitting || !form.formState.isValid}
            className="w-full"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};


import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Settings, Save, RefreshCw } from 'lucide-react';
import { useAdmin, SystemSetting } from '@/hooks/useAdmin';

interface SystemSettingsProps {
  settings: SystemSetting[];
  onRefresh: () => void;
}

const SystemSettings: React.FC<SystemSettingsProps> = ({ settings, onRefresh }) => {
  const { updateSystemSetting } = useAdmin();
  const [editingSettings, setEditingSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<string | null>(null);

  const handleSettingChange = (key: string, value: any) => {
    setEditingSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSetting = async (setting: SystemSetting) => {
    const newValue = editingSettings[setting.key];
    if (newValue === undefined) return;

    setLoading(setting.key);
    await updateSystemSetting(setting.key, newValue);
    await onRefresh();
    setLoading(null);
    
    // Clear editing state for this setting
    setEditingSettings(prev => {
      const newState = { ...prev };
      delete newState[setting.key];
      return newState;
    });
  };

  const getCurrentValue = (setting: SystemSetting) => {
    return editingSettings[setting.key] !== undefined 
      ? editingSettings[setting.key] 
      : setting.value;
  };

  const hasChanges = (setting: SystemSetting) => {
    return editingSettings[setting.key] !== undefined && 
           editingSettings[setting.key] !== setting.value;
  };

  const renderSettingInput = (setting: SystemSetting) => {
    const currentValue = getCurrentValue(setting);
    
    if (typeof setting.value === 'boolean') {
      return (
        <Switch
          checked={currentValue}
          onCheckedChange={(checked) => handleSettingChange(setting.key, checked)}
        />
      );
    }
    
    if (typeof setting.value === 'number') {
      return (
        <Input
          type="number"
          value={currentValue}
          onChange={(e) => handleSettingChange(setting.key, parseInt(e.target.value))}
          className="max-w-32"
        />
      );
    }
    
    return (
      <Input
        type={setting.key.includes('passphrase') ? 'password' : 'text'}
        value={currentValue}
        onChange={(e) => handleSettingChange(setting.key, e.target.value)}
        className="max-w-64"
      />
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>System Settings</CardTitle>
            <CardDescription>
              Configure application-wide settings and parameters
            </CardDescription>
          </div>
          <Button variant="outline" onClick={onRefresh} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {settings.map((setting) => (
            <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <Label className="text-base font-medium">{setting.key}</Label>
                  {hasChanges(setting) && (
                    <Badge variant="secondary">Modified</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {setting.description}
                </p>
                <div className="text-xs text-muted-foreground">
                  Last updated: {setting.updated_at ? new Date(setting.updated_at).toLocaleString() : 'Never'}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {renderSettingInput(setting)}
                
                {hasChanges(setting) && (
                  <Button
                    size="sm"
                    onClick={() => handleSaveSetting(setting)}
                    disabled={loading === setting.key}
                    className="flex items-center gap-1"
                  >
                    <Save className="h-3 w-3" />
                    {loading === setting.key ? 'Saving...' : 'Save'}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemSettings;

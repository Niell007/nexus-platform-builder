
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Lock } from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';

interface PatriotModeAccessProps {
  onAccessGranted: () => void;
}

const PatriotModeAccess: React.FC<PatriotModeAccessProps> = ({ onAccessGranted }) => {
  const [passphrase, setPassphrase] = useState('');
  const [loading, setLoading] = useState(false);
  const { promoteToAdmin } = useAdmin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const success = await promoteToAdmin(passphrase);
    if (success) {
      onAccessGranted();
    }

    setLoading(false);
    setPassphrase('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-blue-50 to-white dark:from-gray-900 dark:via-blue-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2 border-red-200 dark:border-red-800">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
            <Shield className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600 dark:text-red-400">
            🇺🇸 PATRIOT MODE 🇺🇸
          </CardTitle>
          <CardDescription className="text-center">
            Enter the secret passphrase to gain administrative access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="passphrase" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Passphrase
              </Label>
              <Input
                id="passphrase"
                type="password"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder="Enter patriot passphrase..."
                className="border-red-200 dark:border-red-800 focus:border-red-400 dark:focus:border-red-600"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Access Admin Panel'}
            </Button>
          </form>
          <div className="mt-4 text-xs text-center text-muted-foreground">
            🦅 For authorized personnel only 🦅
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatriotModeAccess;

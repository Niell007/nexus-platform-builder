
import { useState, useEffect } from 'react';

interface LocaleSettings {
  language: string;
  region: string;
  timezone: string;
  currency: string;
  units: 'metric' | 'imperial';
  dateFormat: string;
  decimalSeparator: string;
}

export const useLocalization = () => {
  const [locale, setLocale] = useState<LocaleSettings>({
    language: 'en',
    region: 'US',
    timezone: 'America/New_York',
    currency: 'USD',
    units: 'imperial',
    dateFormat: 'MM/DD/YYYY',
    decimalSeparator: '.'
  });

  useEffect(() => {
    // Detect user's locale settings
    const userLanguage = navigator.language || 'en-US';
    const [language, region] = userLanguage.split('-');
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Regional settings based on locale
    const regionalSettings: Record<string, Partial<LocaleSettings>> = {
      'US': { currency: 'USD', units: 'imperial', dateFormat: 'MM/DD/YYYY', decimalSeparator: '.' },
      'GB': { currency: 'GBP', units: 'metric', dateFormat: 'DD/MM/YYYY', decimalSeparator: '.' },
      'DE': { currency: 'EUR', units: 'metric', dateFormat: 'DD.MM.YYYY', decimalSeparator: ',' },
      'FR': { currency: 'EUR', units: 'metric', dateFormat: 'DD/MM/YYYY', decimalSeparator: ',' },
      'CA': { currency: 'CAD', units: 'metric', dateFormat: 'DD/MM/YYYY', decimalSeparator: '.' },
    };

    const settings = regionalSettings[region || 'US'] || regionalSettings['US'];

    setLocale(prev => ({
      ...prev,
      language: language || 'en',
      region: region || 'US',
      timezone,
      currency: settings.currency || prev.currency,
      units: settings.units || prev.units,
      dateFormat: settings.dateFormat || prev.dateFormat,
      decimalSeparator: settings.decimalSeparator || prev.decimalSeparator
    }));
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(`${locale.language}-${locale.region}`, {
      style: 'currency',
      currency: locale.currency
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(`${locale.language}-${locale.region}`, {
      timeZone: locale.timezone
    }).format(date);
  };

  return { locale, setLocale, formatCurrency, formatDate };
};

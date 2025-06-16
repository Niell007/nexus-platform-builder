
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
    region: 'ZA',
    timezone: 'Africa/Johannesburg',
    currency: 'ZAR',
    units: 'metric',
    dateFormat: 'DD/MM/YYYY',
    decimalSeparator: ','
  });

  useEffect(() => {
    // Detect user's locale settings
    const userLanguage = navigator.language || 'en-ZA';
    const [language, region] = userLanguage.split('-');
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Regional settings based on locale with South Africa as priority
    const regionalSettings: Record<string, Partial<LocaleSettings>> = {
      'ZA': { currency: 'ZAR', units: 'metric', dateFormat: 'DD/MM/YYYY', decimalSeparator: ',' },
      'US': { currency: 'USD', units: 'imperial', dateFormat: 'MM/DD/YYYY', decimalSeparator: '.' },
      'GB': { currency: 'GBP', units: 'metric', dateFormat: 'DD/MM/YYYY', decimalSeparator: '.' },
      'DE': { currency: 'EUR', units: 'metric', dateFormat: 'DD.MM.YYYY', decimalSeparator: ',' },
      'FR': { currency: 'EUR', units: 'metric', dateFormat: 'DD/MM/YYYY', decimalSeparator: ',' },
      'CA': { currency: 'CAD', units: 'metric', dateFormat: 'DD/MM/YYYY', decimalSeparator: '.' },
    };

    // Default to South Africa if region not found
    const settings = regionalSettings[region || 'ZA'] || regionalSettings['ZA'];

    setLocale(prev => ({
      ...prev,
      language: language || 'en',
      region: region || 'ZA',
      timezone: timezone || 'Africa/Johannesburg',
      currency: settings.currency || 'ZAR',
      units: settings.units || 'metric',
      dateFormat: settings.dateFormat || 'DD/MM/YYYY',
      decimalSeparator: settings.decimalSeparator || ','
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

  const convertToZAR = (dollarAmount: string): string => {
    // Extract numbers from price range like "$80-200" or "$100"
    const numbers = dollarAmount.match(/\d+/g);
    if (!numbers) return dollarAmount;

    // USD to ZAR conversion rate (approximate)
    const conversionRate = 18.5;
    
    if (numbers.length === 1) {
      const zarAmount = Math.round(parseInt(numbers[0]) * conversionRate);
      return `R${zarAmount.toLocaleString()}`;
    } else if (numbers.length === 2) {
      const zarMin = Math.round(parseInt(numbers[0]) * conversionRate);
      const zarMax = Math.round(parseInt(numbers[1]) * conversionRate);
      return `R${zarMin.toLocaleString()}-R${zarMax.toLocaleString()}`;
    }
    
    return dollarAmount;
  };

  return { locale, setLocale, formatCurrency, formatDate, convertToZAR };
};

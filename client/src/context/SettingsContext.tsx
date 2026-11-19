import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { publicApi } from '@/api/endpoints';
import type { PublicSettings } from '@/types';

const FALLBACK_SETTINGS: PublicSettings = {
  businessName: 'Ayesha Herbal & Beauty',
  whatsappNumber: '919892934245',
  instagramUrl: 'https://www.instagram.com/ayeshaherbal_and_beauty/',
  email: '',
  mapsUrl: '',
  whatsappTemplate:
    'Hi Ayesha Herbal & Beauty! 🌸\n' +
    'I would like to order:\n' +
    '{{ITEMS}}\n' +
    'Estimated total: {{TOTAL}}\n\n' +
    'Please share availability and delivery details.',
  whatsappSingleProductTemplate:
    'Hi Ayesha Herbal & Beauty! 🌸\n' +
    'I would like to order:\n' +
    '• {{PRODUCT}}\n' +
    '{{VARIANT_LINE}}{{QTY_LINE}}Price: {{PRICE}}\n\n' +
    'Please share availability and delivery details.',
  hero: {
    headline: 'A little care. A lot of glow.',
    subheadline:
      'Discover everyday herbal beauty and self-care essentials made to bring a little more care to your daily routine.',
    imageUrl: '',
  },
  about: {
    intro:
      'Ayesha Herbal & Beauty brings together everyday herbal beauty and self-care essentials, chosen to make caring for yourself feel simple.',
    story: '',
    founderImageUrl: '',
  },
  announcements: { enabled: false, text: '' },
};

interface SettingsContextValue {
  settings: PublicSettings;
  loading: boolean;
  error: string | null;
  whatsappConfigured: boolean;
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: FALLBACK_SETTINGS,
  loading: true,
  error: null,
  whatsappConfigured: false,
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<PublicSettings>(FALLBACK_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    publicApi
      .getSettings()
      .then(({ settings }) => {
        if (!cancelled) {
          setSettings({ ...FALLBACK_SETTINGS, ...settings });
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('Could not load site settings');
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const whatsappConfigured = Boolean(settings.whatsappNumber);

  return (
    <SettingsContext.Provider value={{ settings, loading, error, whatsappConfigured }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  return useContext(SettingsContext);
}

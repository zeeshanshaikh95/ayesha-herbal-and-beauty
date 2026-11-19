import mongoose, { Schema, model, type Model } from 'mongoose';

export const WHATSAPP_TEMPLATE_DEFAULT =
  'Hi Ayesha Herbal & Beauty! 🌸\n' +
  'I would like to order the following:\n' +
  '{{ITEMS}}\n' +
  'Estimated total: {{TOTAL}}\n\n' +
  'Please share availability and delivery details.';

export const WHATSAPP_TEMPLATE_SINGLE_DEFAULT =
  'Hi Ayesha Herbal & Beauty! 🌸\n' +
  'I would like to order:\n' +
  '• {{PRODUCT}}\n' +
  '{{VARIANT_LINE}}{{QTY_LINE}}Price: {{PRICE}}\n\n' +
  'Please share availability and delivery details.';

export interface ISiteSettings {
  businessName: string;
  whatsappNumber: string;
  instagramUrl: string;
  email: string;
  mapsUrl: string;
  whatsappTemplate: string;
  whatsappSingleProductTemplate: string;
  hero: {
    headline: string;
    subheadline: string;
    imageUrl: string;
    /** Cloudinary public_id for `hero.imageUrl` (derived on save, server-side). */
    imagePublicId: string;
  };
  about: {
    intro: string;
    story: string;
    founderImageUrl: string;
    /** Cloudinary public_id for `about.founderImageUrl` (derived on save, server-side). */
    founderImagePublicId: string;
  };
  announcements: {
    enabled: boolean;
    text: string;
  };
  updatedAt: Date;
}

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    businessName: { type: String, default: 'Ayesha Herbal & Beauty' },
    whatsappNumber: { type: String, default: '+919892934245' },
    instagramUrl: { type: String, default: 'https://www.instagram.com/ayeshaherbal_and_beauty/' },
    email: { type: String, default: '' },
    mapsUrl: { type: String, default: '' },
    whatsappTemplate: { type: String, default: WHATSAPP_TEMPLATE_DEFAULT },
    whatsappSingleProductTemplate: { type: String, default: WHATSAPP_TEMPLATE_SINGLE_DEFAULT },
    hero: {
      headline: { type: String, default: 'A little care. A lot of glow.' },
      subheadline: {
        type: String,
        default:
          'Discover everyday herbal beauty and self-care essentials made to bring a little more care to your daily routine.',
      },
      imageUrl: { type: String, default: '' },
      imagePublicId: { type: String, default: '' },
    },
    about: {
      intro: {
        type: String,
        default:
          'Ayesha Herbal & Beauty brings together everyday herbal beauty and self-care essentials, chosen to make caring for yourself feel simple.',
      },
      story: { type: String, default: '' },
      founderImageUrl: { type: String, default: '' },
      founderImagePublicId: { type: String, default: '' },
    },
    announcements: {
      enabled: { type: Boolean, default: false },
      text: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

export const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ?? model<ISiteSettings>('SiteSettings', siteSettingsSchema);

/**
 * Idempotent bootstrap logic shared by the seed CLI and the server's
 * AUTO_SEED startup hook. Creates ONLY what the application needs to run:
 *   • the first admin account (from ADMIN_EMAIL / ADMIN_PASSWORD)
 *   • the singleton SiteSettings document with default WhatsApp templates
 *
 * The catalogue is deliberately never touched here — real products,
 * categories, reviews and gallery items come from the client via /admin.
 */
import bcrypt from 'bcryptjs';
import { AdminUser, SiteSettings } from '../models/index.js';
import { config } from '../config/env.js';

export async function bootstrapAdmin(): Promise<void> {
  const existing = await AdminUser.findOne({ email: config.adminEmail });
  if (existing) {
    console.log(`• Admin already exists: ${config.adminEmail}`);
    // Self-heal: if the account still authenticates with the bootstrap password
    // but the first-login flag was cleared (e.g. by an API smoke run), re-arm it.
    if (
      !existing.mustChangePassword &&
      (await bcrypt.compare(config.adminPassword, existing.passwordHash))
    ) {
      existing.mustChangePassword = true;
      await existing.save();
      console.log('  ↻ Bootstrap password still in use — first-login password change re-armed.');
    }
    return;
  }

  if (config.adminPassword === '[CHANGE_ME_BEFORE_PRODUCTION]') {
    console.log(
      '! ADMIN_PASSWORD is still the placeholder from .env.example — set a real password first.'
    );
  }

  const passwordHash = await bcrypt.hash(config.adminPassword, 12);
  await AdminUser.create({
    email: config.adminEmail,
    passwordHash,
    role: 'admin',
    // Bootstrap credentials (ADMIN_PASSWORD) must be rotated on first login.
    mustChangePassword: true,
  });
  console.log(`✓ Admin created: ${config.adminEmail}`);
}

export async function bootstrapSettings(): Promise<void> {
  const existing = await SiteSettings.findOne();
  if (existing) {
    console.log('• Site settings already exist');
    return;
  }

  await SiteSettings.create({
    businessName: 'Ayesha Herbal & Beauty',
    whatsappNumber: '+919892934245',
    instagramUrl: 'https://www.instagram.com/ayeshaherbal_and_beauty/',
    email: '',
    mapsUrl: '',
    hero: {
      headline: 'A little care. A lot of glow.',
      subheadline:
        'Discover everyday herbal beauty and self-care essentials made to bring a little more care to your daily routine.',
      imageUrl: '',
    },
    about: {
      intro:
        'Ayesha Herbal & Beauty brings together everyday herbal beauty and self-care essentials, chosen to make caring for yourself feel simple.',
      story:
        'Ayesha Herbal & Beauty began with a simple idea: everyday beauty care should feel gentle, personal and easy to keep up with. From bridal creams and handmade soaps to face washes, scrubs and hair oil, the collection is made for simple routines and small moments of self-care.\n\nEvery order is handled personally on WhatsApp, so you can ask questions, confirm availability and get guidance before you buy.',
      founderImageUrl: '',
    },
    announcements: { enabled: false, text: '' },
  });
  console.log('✓ Site settings created with Ayesha Herbal & Beauty defaults');
}

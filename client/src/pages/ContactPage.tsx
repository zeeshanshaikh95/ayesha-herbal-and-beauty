import { useSettings } from '@/context/SettingsContext';
import { Seo } from '@/components/seo/Seo';
import { FloralDivider } from '@/components/FloralDivider';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { WhatsAppGlyph } from '@/components/ProductCard';

const STEPS = [
  { title: 'Browse', text: 'Explore the collection and open any product for details.' },
  { title: 'Message', text: 'Tap Order on WhatsApp — your product details are pre-filled.' },
  { title: 'Confirm', text: 'We reply with availability, final pricing and delivery details.' },
];

export function ContactPage() {
  const { settings, whatsappConfigured } = useSettings();
  const instagram = settings.instagramUrl || 'https://www.instagram.com/ayeshaherbal_and_beauty/';
  const instagramHandle = `@${instagram.split('/').filter(Boolean).pop() || 'ayeshaherbal_and_beauty'}`;
  const digits = settings.whatsappNumber.replace(/\D/g, '');
  const displayNumber = digits.replace(/^91(\d{5})(\d{5})$/, '+91 $1 $2');

  return (
    <>
      <Seo
        title="Contact Us"
        description="Reach Ayesha Herbal & Beauty on WhatsApp for orders, questions and personal product guidance."
        canonicalPath="/contact"
      />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <header className="text-center">
          <p className="eyebrow justify-center">Get in touch</p>
          <h1 className="section-title mt-3">We'd love to hear from you</h1>
          <FloralDivider className="mt-4" />
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
            The fastest way to reach us is WhatsApp — ask about products, availability or delivery,
            or get a personal recommendation.
          </p>
        </header>

        <div className="mt-10 space-y-4">
          <div className="card flex flex-col items-center gap-4 p-8 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366]/10 text-[#1EB855]">
              <WhatsAppGlyph className="h-7 w-7" />
            </span>
            <h2 className="font-display text-xl font-semibold">WhatsApp</h2>
            {whatsappConfigured ? (
              <>
                <p className="text-sm text-ink-soft">
                  Message us directly — we'll reply with availability and delivery details.
                </p>
                <WhatsAppButton
                  message="Hi Ayesha Herbal & Beauty! I have a question about your products."
                  label="Chat on WhatsApp"
                  size="lg"
                />
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-ink-soft hover:text-brand-700"
                >
                  +{displayNumber.replace(/^\+/, '')}
                </a>
              </>
            ) : (
              <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                WhatsApp number will be available soon
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card p-6 text-center">
              <h2 className="font-display text-lg font-semibold">Instagram</h2>
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                {instagramHandle}
              </a>
            </div>

            <div className="card p-6 text-center">
              <h2 className="font-display text-lg font-semibold">Email</h2>
              {settings.email ? (
                <a href={`mailto:${settings.email}`} className="mt-2 inline-block text-sm font-semibold text-brand-700 hover:text-brand-800">
                  {settings.email}
                </a>
              ) : (
                <p className="mt-2 text-sm text-ink-soft">For now, WhatsApp is the quickest way to reach us.</p>
              )}
            </div>
          </div>

          {settings.mapsUrl ? (
            <div className="card p-6 text-center">
              <h2 className="font-display text-lg font-semibold">Find us</h2>
              <a href={settings.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-brand-700 hover:text-brand-800">
                Open in Google Maps →
              </a>
            </div>
          ) : null}
        </div>

        <div className="mt-12">
          <h2 className="text-center font-display text-2xl font-semibold">How ordering works</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={step.title} className="rounded-blob border border-brand-100 bg-white p-5 text-center shadow-card">
                <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-xs leading-relaxed text-ink-soft/80">
          Prices are in Indian rupees (INR). Availability and final pricing are confirmed on WhatsApp
          before your order is placed.
        </p>
      </div>
    </>
  );
}

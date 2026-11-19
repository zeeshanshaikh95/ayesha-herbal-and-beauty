import { useSettings } from '@/context/SettingsContext';
import { Seo } from '@/components/seo/Seo';
import { FloralDivider } from '@/components/FloralDivider';
import { Link } from 'react-router-dom';
import { ABOUT_IMAGE } from '@/lib/brand';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const PROMISES = [
  {
    title: 'Everyday herbal beauty',
    text: 'A considered collection of skincare, body care and self-care essentials for simple daily routines.',
  },
  {
    title: 'Made with care',
    text: 'Products are chosen and prepared with attention to the little details that make a routine feel special.',
  },
  {
    title: 'Personal service',
    text: 'Every order is handled personally on WhatsApp, so you can ask questions before you buy.',
  },
];

export function AboutPage() {
  const { settings } = useSettings();

  return (
    <>
      <Seo
        title="Our Story"
        description="The story behind Ayesha Herbal & Beauty — everyday herbal beauty and self-care essentials made with care."
        canonicalPath="/about"
      />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <header className="text-center">
          <p className="eyebrow justify-center">Our story</p>
          <h1 className="section-title mt-3">A little care. A lot of glow.</h1>
          <FloralDivider className="mt-4" />
        </header>

        <div className="mx-auto mt-10 aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-arch border border-brand-200/70 bg-brand-50 shadow-card">
          <img
            src={settings.about.founderImageUrl || ABOUT_IMAGE}
            alt="Ayesha Herbal & Beauty collection"
            width={1536}
            height={1024}
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="mx-auto mt-10 max-w-2xl space-y-5 text-center">
          <p className="text-lg leading-relaxed text-ink">
            {settings.about.intro ||
              'Ayesha Herbal & Beauty brings together everyday herbal beauty and self-care essentials, chosen to make caring for yourself feel simple.'}
          </p>

          {settings.about.story ? (
            <p className="whitespace-pre-line leading-relaxed text-ink-soft">
              {settings.about.story}
            </p>
          ) : (
            <p className="leading-relaxed text-ink-soft">
              From bridal creams and handmade soaps to face washes, scrubs and hair oil, the
              collection is made for simple routines and small moments of self-care. Every order is
              handled personally on WhatsApp, so you can ask questions, confirm availability and get
              guidance before you buy.
            </p>
          )}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {PROMISES.map((item) => (
            <div key={item.title} className="card p-6 text-center">
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-600" aria-hidden="true">
                ✿
              </span>
              <h2 className="mt-3 font-display text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link to="/shop" className="btn-primary">Shop the collection</Link>
          <WhatsAppButton
            message="Hi Ayesha Herbal & Beauty! I would like to know more about your products."
            label="Ask on WhatsApp"
          />
        </div>
      </div>
    </>
  );
}

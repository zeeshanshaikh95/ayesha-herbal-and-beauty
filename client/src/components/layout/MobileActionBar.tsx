import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useSettings } from '@/context/SettingsContext';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';
import { WhatsAppGlyph } from '@/components/ProductCard';

/** Thumb-friendly bottom bar for phones: shop, WhatsApp and cart always one tap away. */
export function MobileActionBar() {
  const { count, openCart } = useCart();
  const { settings, whatsappConfigured } = useSettings();
  const link = whatsappConfigured
    ? buildWhatsAppLink(settings, 'Hi Ayesha Herbal & Beauty! I have a question about your products.')
    : null;

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-3 bottom-3 z-[60] flex items-center justify-between gap-2 rounded-full border border-brand-100 bg-white/95 p-2 shadow-glow backdrop-blur md:hidden"
    >
      <Link
        to="/shop"
        className="flex flex-1 flex-col items-center gap-0.5 rounded-full py-1.5 text-[10px] font-semibold uppercase tracking-wide text-ink-soft"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 7l8-4 8 4v10l-8 4-8-4V7zm8 12V11m8-4l-8 4-8-4" />
        </svg>
        Shop
      </Link>

      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent({ type: 'whatsapp_click' })}
          className="-mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft ring-4 ring-cream"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppGlyph className="h-7 w-7" />
        </a>
      ) : (
        <span className="-mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-ink/20 text-white ring-4 ring-cream" aria-hidden="true">
          <WhatsAppGlyph className="h-7 w-7" />
        </span>
      )}

      <button
        type="button"
        onClick={openCart}
        className="relative flex flex-1 flex-col items-center gap-0.5 rounded-full py-1.5 text-[10px] font-semibold uppercase tracking-wide text-ink-soft"
        aria-label={`Open cart (${count} items)`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="9" cy="20" r="1.4" />
          <circle cx="18" cy="20" r="1.4" />
          <path d="M3 4h2l2.2 9.5a1 1 0 0 0 1 .8h9.6a1 1 0 0 0 1-.8L20 7H6" />
        </svg>
        Cart
        {count > 0 ? (
          <span className="absolute right-3 top-0 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-brand-600 px-1 text-[9px] font-bold text-white">
            {count}
          </span>
        ) : null}
      </button>
    </nav>
  );
}

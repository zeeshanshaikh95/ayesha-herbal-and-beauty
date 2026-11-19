import { Link } from 'react-router-dom';
import { LOGO_TRIMMED } from '@/lib/brand';

interface Props {
  /** `md` is the navbar, `lg` the footer, `sm` the admin topbar. */
  size?: 'sm' | 'md' | 'lg';
  /** Render the wordmark next to the roundel. */
  showWordmark?: boolean;
  className?: string;
}

const MARK_SIZE = { sm: 'h-9 w-9', md: 'h-11 w-11 sm:h-12 sm:w-12', lg: 'h-20 w-20' };
const NAME_SIZE = { sm: 'text-base', md: 'text-xl sm:text-[1.35rem]', lg: 'text-3xl' };
const TAG_SIZE = { sm: 'text-[8px]', md: 'text-[9px]', lg: 'text-[10px]' };

/** The brand lockup used across the storefront and admin. */
export function BrandLogo({ size = 'md', showWordmark = true, className = '' }: Props) {
  return (
    <Link
      to="/"
      className={`group flex shrink-0 items-center gap-3 ${className}`}
      aria-label="Ayesha Herbal & Beauty — home"
    >
      <img
        src={LOGO_TRIMMED}
        alt=""
        width={1024}
        height={1024}
        className={`${MARK_SIZE[size]} rounded-full object-contain shadow-sm ring-1 ring-brand-200/70 transition-transform duration-300 group-hover:rotate-3`}
      />
      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span className={`font-display font-bold tracking-tight text-ink ${NAME_SIZE[size]}`}>
            Ayesha
          </span>
          <span
            className={`mt-1 font-semibold uppercase tracking-[0.22em] text-brand-600 ${TAG_SIZE[size]}`}
          >
            Herbal &amp; Beauty
          </span>
        </span>
      ) : null}
    </Link>
  );
}

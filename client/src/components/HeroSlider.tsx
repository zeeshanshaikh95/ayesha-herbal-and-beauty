import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';
import { formatPrice } from '@/lib/format';
import type { Product } from '@/types';

interface Props {
  products: Product[];
}

/** Rotating hero showcase of the client's own products. */
export function HeroSlider({ products }: Props) {
  const items = products.length ? products : [];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (items.length < 2 || paused) return;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [items.length, paused]);

  if (!items.length) return null;

  const active = items[index];

  return (
    <div
      className="relative mx-auto w-full max-w-md pb-8 pr-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-[2.25rem] border border-brand-200/80 bg-white p-2.5 shadow-glow">
        <div className="relative aspect-[4/3.4] overflow-hidden rounded-[1.9rem] bg-blush">
          {items.map((product, i) => (
            <img
              key={product._id}
              src={product.images[0]}
              alt={product.name}
              loading={i === 0 ? 'eager' : 'lazy'}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
                i === index ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
              }`}
            />
          ))}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />

          <div className="absolute left-4 top-4 flex gap-2">
            {active.bestseller && (
              <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-800">
                Bestseller
              </span>
            )}
            {active.featured && (
              <span className="rounded-full bg-ink/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                Featured
              </span>
            )}
          </div>

          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white">
            <div className="max-w-[60%]">
              <p className="font-display text-lg font-semibold leading-tight drop-shadow sm:text-xl">
                {active.name}
              </p>
              <p className="mt-1 text-xs font-semibold text-brand-100">{formatPrice(active.price)}</p>
            </div>
            <Link
              to={`/product/${active.slug}`}
              onClick={() => trackEvent({ type: 'product_view', productSlug: active.slug })}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-600 shadow-soft transition-transform hover:scale-105"
              aria-label={`View ${active.name}`}
            >
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-1 right-0 flex h-28 w-28 animate-float flex-col items-center justify-center rounded-full border-[6px] border-cream bg-brand-500 text-center text-white shadow-soft">
        <span className="text-[9px] font-semibold uppercase tracking-[0.14em]">Herbal</span>
        <span className="font-display text-xl leading-tight">beauty</span>
        <span className="text-[9px] font-semibold uppercase tracking-[0.14em]">every day</span>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {items.map((product, i) => (
          <button
            key={product._id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show ${product.name}`}
            aria-pressed={i === index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-8 bg-brand-600' : 'w-3 bg-brand-200 hover:bg-brand-400'
            }`}
          />
        ))}
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {items.map((product, i) => (
          <button
            key={product._id}
            type="button"
            onClick={() => setIndex(i)}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              i === index
                ? 'border-brand-600 bg-brand-600 text-white'
                : 'border-brand-200 bg-white text-ink-soft hover:border-brand-400'
            }`}
          >
            <img
              src={product.images[0]}
              alt=""
              className="h-6 w-6 rounded-full object-cover"
              loading="lazy"
            />
            <span className="max-w-[10rem] truncate">{product.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

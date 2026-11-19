import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { publicApi } from '@/api/endpoints';
import { useApi } from '@/hooks/useApi';
import { useSettings } from '@/context/SettingsContext';
import { ProductCard } from '@/components/ProductCard';
import { PlaceholderImage } from '@/components/PlaceholderImage';
import { FloralDivider } from '@/components/FloralDivider';
import { Stars } from '@/components/Stars';
import { Seo } from '@/components/seo/Seo';
import { EmptyState } from '@/components/EmptyState';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { trackEvent } from '@/lib/analytics';
import { truncate } from '@/lib/format';
import { HERO_IMAGE, ABOUT_IMAGE } from '@/lib/brand';

const VALUES = [
  {
    title: 'Quality you can trust',
    text: 'A considered collection of beauty and self-care essentials for your daily routine.',
    icon: (
      <path d="M12 3l2.4 5.2 5.6.7-4.1 3.9 1 5.6-4.9-2.8-4.9 2.8 1-5.6L4 8.9l5.6-.7L12 3z" />
    ),
  },
  {
    title: 'Beauty for every day',
    text: 'From facial care to body care, find familiar favourites for your everyday routine.',
    icon: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
      </>
    ),
  },
  {
    title: 'Your beauty, your choice',
    text: 'Choose the products that feel right for you and enjoy your own moment of self-care.',
    icon: (
      <path d="M12 20s-7-4.2-7-9a4 4 0 017-2.6A4 4 0 0119 11c0 4.8-7 9-7 9z" />
    ),
  },
];

export function HomePage() {
  const { settings } = useSettings();
  const categories = useApi(() => publicApi.listCategories().then((r) => r.categories), []);
  const bestsellers = useApi(
    () => publicApi.listProducts({ sort: 'bestseller' }).then((r) => r.products.filter((p) => p.bestseller)),
    []
  );
  const featured = useApi(
    () => publicApi.listProducts({ sort: 'featured' }).then((r) => r.products.filter((p) => p.featured)),
    []
  );
  const reviews = useApi(() => publicApi.listReviews().then((r) => r.reviews), []);
  const gallery = useApi(() => publicApi.listGallery().then((r) => r.items), []);

  useEffect(() => {
    trackEvent({ type: 'page_view', path: '/' });
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.businessName,
    ...(settings.instagramUrl ? { sameAs: [settings.instagramUrl] } : {}),
  };

  const headline = settings.hero.headline || 'A little care. A lot of glow.';
  const headlineParts = headline.split('. ').filter(Boolean);
  const headlineLead = (headlineParts[0] ?? headline).replace(/\.$/, '');
  const headlineTail = headlineParts.slice(1).join('. ').replace(/\.$/, '');

  return (
    <>
      <Seo
        title="Herbal Skincare & Self-Care"
        description="Everyday herbal beauty and self-care essentials from Ayesha Herbal & Beauty. Browse the collection and order directly on WhatsApp."
        canonicalPath="/"
        jsonLd={jsonLd}
      />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blush via-cream to-cream">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-100/80 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 top-1/3 h-64 w-64 rounded-full bg-gold-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 md:pb-20 md:pt-20">
          <div className="grid items-center gap-12 md:grid-cols-[1.02fr_0.98fr]">
            <div className="animate-fade-up">
              <p className="eyebrow">Beauty, inspired by nature</p>
              <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-[4.6rem]">
                {headlineLead}.
                {headlineTail ? (
                  <>
                    <br />
                    <em className="font-normal italic text-brand-600">{headlineTail}.</em>
                  </>
                ) : null}
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
                {settings.hero.subheadline ||
                  'Discover everyday herbal beauty and self-care essentials made to bring a little more care to your daily routine.'}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/shop" className="btn-primary">
                  Explore our collection
                  <span aria-hidden="true">→</span>
                </Link>
                <WhatsAppButton
                  message="Hi Ayesha Herbal & Beauty! I would like to know more about your products."
                  label="Chat with us"
                />
              </div>
              <div className="mt-7 flex items-center gap-3 text-xs text-ink-soft">
                <span className="text-lg text-brand-500" aria-hidden="true">✳</span>
                <span>Simple rituals, everyday confidence.</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md pb-8 pr-3">
              <div className="relative overflow-hidden rounded-arch border border-brand-200/80 bg-white p-2.5 shadow-glow">
                <div className="overflow-hidden rounded-arch">
                  <img
                    src={settings.hero.imageUrl || HERO_IMAGE}
                    alt="A collection of Ayesha Herbal & Beauty skincare products"
                    width={1536}
                    height={1024}
                    loading="eager"
                    className="aspect-[4/3.4] w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="absolute -bottom-1 right-0 flex h-28 w-28 animate-float flex-col items-center justify-center rounded-full border-[6px] border-cream bg-brand-500 text-center text-white shadow-soft">
                <span className="text-[9px] font-semibold uppercase tracking-[0.14em]">Herbal</span>
                <span className="font-display text-xl leading-tight">beauty</span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.14em]">every day</span>
              </div>
              <span className="absolute -left-3 top-6 text-3xl text-brand-300" aria-hidden="true">✿</span>
              <span className="absolute -right-2 top-1/3 text-xl text-gold-400" aria-hidden="true">✦</span>
            </div>
          </div>
        </div>

        <div className="relative border-y border-brand-100 bg-white/60 py-3.5 overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center gap-8" aria-hidden={dup === 1}>
                <span>Herbal beauty</span>
                <span className="text-brand-500">✦</span>
                <span>Everyday self-care</span>
                <span className="text-brand-500">✦</span>
                <span>Made with care</span>
                <span className="text-brand-500">✦</span>
                <span>Bridal favourites</span>
                <span className="text-brand-500">✦</span>
                <span>Order on WhatsApp</span>
                <span className="text-brand-500">✦</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="values-heading">
        <div className="text-center">
          <p className="eyebrow justify-center">A mindful beauty routine</p>
          <h2 id="values-heading" className="section-title mt-3">
            Good care feels like <em className="font-normal italic text-brand-600">you.</em>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">
            Discover your favourites and make a little space for yourself, every day.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {VALUES.map((item) => (
            <article
              key={item.title}
              className="group rounded-blob border border-brand-100 bg-white p-6 shadow-card transition-shadow hover:shadow-soft"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-200 bg-gold-100/50 text-brand-600 transition-transform group-hover:-rotate-6">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  {item.icon}
                </svg>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Categories ──────────────────────────────────────────── */}
      <section className="bg-blush/60 py-16" aria-labelledby="categories-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <p className="eyebrow justify-center">Browse</p>
            <h2 id="categories-heading" className="section-title mt-3">Shop by category</h2>
            <FloralDivider className="mt-4" />
          </div>

          {categories.loading ? (
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {[...Array(5)].map((_, i) => <div key={i} className="skeleton h-56" />)}
            </div>
          ) : categories.error ? (
            <div className="mt-8"><EmptyState icon="error" title="Couldn't load categories" description={categories.error} action={<button className="btn-outline" onClick={() => categories.refetch()}>Try again</button>} /></div>
          ) : !categories.data?.length ? (
            <div className="mt-8">
              <EmptyState
                title="Our categories are on the way"
                description="Message us on WhatsApp and we'll help you find the right product."
              />
            </div>
          ) : (
            <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-thin sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5">
              {categories.data.map((cat, index) => (
                <Link
                  key={cat._id}
                  to={`/category/${cat.slug}`}
                  className="group relative flex w-[68vw] shrink-0 snap-start flex-col overflow-hidden rounded-[2rem] border border-brand-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft sm:w-auto"
                >
                  <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-gradient-to-b from-brand-50 to-brand-100/70 px-5 pb-5 pt-14">
                    <span className="absolute left-5 top-4 font-display text-2xl font-semibold text-brand-300 transition-colors group-hover:text-brand-500">
                      0{index + 1}
                    </span>
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        loading="lazy"
                        className="max-h-full w-auto max-w-full object-contain drop-shadow-[0_18px_18px_rgba(106,11,53,0.22)] transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2"
                      />
                    ) : (
                      <PlaceholderImage seed={cat.slug} />
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-3 px-5 py-4">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-ink">{truncate(cat.name, 40)}</h3>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-600">Shop now</p>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Bestsellers ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="bestsellers-heading">
        <div className="flex flex-col items-end justify-between gap-4 sm:flex-row">
          <div>
            <p className="eyebrow">Loved by our customers</p>
            <h2 id="bestsellers-heading" className="section-title mt-3">Bestsellers</h2>
          </div>
          <Link to="/shop" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
            View all products <span aria-hidden="true">→</span>
          </Link>
        </div>

        {bestsellers.loading ? (
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-80" />)}
          </div>
        ) : bestsellers.error ? (
          <div className="mt-8"><EmptyState icon="error" title="Couldn't load products" description={bestsellers.error} /></div>
        ) : !bestsellers.data?.length ? (
          <div className="mt-8">
            <EmptyState
              title="No products available yet"
              description="Our products will appear here as soon as the catalogue is ready."
            />
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {bestsellers.data.slice(0, 8).map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </section>

      {/* ── Brand band ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-600 py-16 text-white">
        <div className="pointer-events-none absolute -left-10 top-0 text-[12rem] leading-none text-white/10" aria-hidden="true">✿</div>
        <div className="pointer-events-none absolute -right-8 bottom-0 text-[10rem] leading-none text-gold-300/25" aria-hidden="true">✦</div>
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-100">
            Beauty &amp; self-care essentials
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Your beauty,
            <br className="sm:hidden" /> our herbal touch.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-brand-50/90 sm:text-base">
            Everyday essentials for your skincare and self-care routine, with Ayesha Herbal &amp; Beauty.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/shop" className="btn bg-white text-brand-700 hover:bg-brand-50">
              Shop the collection
            </Link>
            <WhatsAppButton
              message="Hi Ayesha Herbal & Beauty! I would like help choosing a product."
              label="Ask us on WhatsApp"
              className="!border !border-white/40 !bg-transparent !text-white hover:!bg-white/10"
            />
          </div>
        </div>
      </section>

      {/* ── Featured ────────────────────────────────────────────── */}
      {featured.data?.length ? (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="featured-heading">
          <div className="text-center">
            <p className="eyebrow justify-center">Find your next favourite</p>
            <h2 id="featured-heading" className="section-title mt-3">Featured products</h2>
            <FloralDivider className="mt-4" />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {featured.data.slice(0, 8).map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        </section>
      ) : null}

      {/* ── About teaser ────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="about-heading">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-arch border border-brand-200/70 bg-brand-50 shadow-card">
              {settings.about.founderImageUrl ? (
                <img
                  src={settings.about.founderImageUrl}
                  alt="Ayesha Herbal & Beauty collection"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <img
                  src={ABOUT_IMAGE}
                  alt="Ayesha Herbal & Beauty collection"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              )}
            </div>
            <div className="absolute -bottom-5 -right-2 rounded-2xl border border-gold-200 bg-white px-5 py-4 text-center shadow-card sm:right-6">
              <p className="font-display text-2xl font-semibold text-brand-600">Since day one</p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft">Made with care</p>
            </div>
          </div>
          <div>
            <p className="eyebrow">Our story</p>
            <h2 id="about-heading" className="section-title mt-3">About Ayesha Herbal &amp; Beauty</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              {settings.about.intro ||
                'Ayesha Herbal & Beauty brings together everyday herbal beauty and self-care essentials, chosen to make caring for yourself feel simple.'}
            </p>
            <ul className="mt-5 space-y-2 text-sm text-ink-soft">
              {['Everyday herbal beauty and self-care', 'A personal, WhatsApp-first ordering experience', 'Products chosen for simple daily routines'].map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" aria-hidden="true" />
                  {line}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <Link to="/about" className="btn-outline">Read our story</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews (only when real, approved reviews exist) ────── */}
      {reviews.data?.length ? (
        <section className="bg-blush/60 py-16" aria-labelledby="reviews-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <p className="eyebrow justify-center">Customer love</p>
              <h2 id="reviews-heading" className="section-title mt-3">Reviews</h2>
              <FloralDivider className="mt-4" />
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {reviews.data.slice(0, 6).map((r) => (
                <figure key={r._id} className="card flex flex-col p-6">
                  <Stars rating={r.rating} />
                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    “{r.text}”
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-semibold text-ink">— {r.customerName}</figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link to="/reviews" className="btn-outline">See all reviews</Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* ── Gallery (only when real gallery items exist) ────────── */}
      {gallery.data?.length ? (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="gallery-heading">
          <div className="text-center">
            <p className="eyebrow justify-center">On Instagram</p>
            <h2 id="gallery-heading" className="section-title mt-3">
              @{settings.instagramUrl?.split('/').filter(Boolean).pop() || 'ayeshaherbal_and_beauty'}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
              A hand-picked selection from our Instagram — follow us for new products and behind the scenes.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {gallery.data.slice(0, 6).map((g) => {
              const inner = g.image ? (
                <img src={g.image} alt={g.caption || 'Instagram post'} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              ) : (
                <PlaceholderImage seed={`ig-${g._id}`} />
              );
              return g.externalUrl ? (
                <a key={g._id} href={g.externalUrl} target="_blank" rel="noopener noreferrer" className="group relative aspect-square overflow-hidden rounded-2xl bg-brand-50">
                  {inner}
                </a>
              ) : (
                <div key={g._id} className="group relative aspect-square overflow-hidden rounded-2xl bg-brand-50">
                  {inner}
                </div>
              );
            })}
          </div>
          {settings.instagramUrl ? (
            <div className="mt-8 text-center">
              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                Follow on Instagram
              </a>
            </div>
          ) : null}
        </section>
      ) : null}

      {/* ── Final WhatsApp CTA ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 py-16">
        <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute -left-16 top-0 h-64 w-64 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-gold-300/40 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-100">Let's stay connected</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
            Questions or ready to order?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-50/90">
            Send us a message on WhatsApp. We'll confirm availability, pricing and delivery details personally.
          </p>
          <div className="mt-8">
            <WhatsAppButton
              message="Hi Ayesha Herbal & Beauty! I would like to place an order."
              label="Chat on WhatsApp"
              size="lg"
              className="!bg-white !text-brand-700 hover:!bg-brand-50"
            />
          </div>
        </div>
      </section>
    </>
  );
}

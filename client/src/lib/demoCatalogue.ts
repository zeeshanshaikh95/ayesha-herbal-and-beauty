/**
 * Static catalogue used ONLY for the GitHub Pages demo build
 * (VITE_DEMO_MODE=true). It mirrors server/src/seed/catalogue.ts so the
 * storefront — browsing, product pages, cart and WhatsApp ordering — works
 * without the API. The admin panel and live edits still require the Express
 * API + MongoDB; set VITE_DEMO_MODE=false (or unset it) once those are live.
 */
import type { Category, GalleryItem, Product, PublicSettings } from '@/types';

export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

const INSTAGRAM = 'https://www.instagram.com/ayeshaherbal_and_beauty/';

const CATEGORY_SEEDS: Array<Omit<Category, 'createdAt' | 'updatedAt'>> = [
  {
    _id: 'demo-cat-face-care',
    name: 'Face Care',
    slug: 'face-care',
    description: 'Creams, face washes and packs for a simple everyday skincare routine.',
    image: 'images/products/bridal-cream.webp',
    displayOrder: 1,
  },
  {
    _id: 'demo-cat-soap-bars',
    name: 'Soap Bars',
    slug: 'soap-bars',
    description: 'Everyday cleansing bars for your bathing routine.',
    image: 'images/products/bridal-soap.webp',
    displayOrder: 2,
  },
  {
    _id: 'demo-cat-body-care',
    name: 'Body Care',
    slug: 'body-care',
    description: 'Body creams made for a smooth, moisturised feel.',
    image: 'images/products/body-whitening-cream.webp',
    displayOrder: 3,
  },
  {
    _id: 'demo-cat-face-body',
    name: 'Face & Body',
    slug: 'face-and-body',
    description: 'Multi-use essentials for face and body care.',
    image: 'images/products/face-body-scrub.webp',
    displayOrder: 4,
  },
  {
    _id: 'demo-cat-hair-care',
    name: 'Hair Care',
    slug: 'hair-care',
    description: 'Nourishing hair-care essentials for your regular routine.',
    image: 'images/products/hair-oil.webp',
    displayOrder: 5,
  },
];

export const demoCategories: Category[] = CATEGORY_SEEDS.map((c) => ({
  ...c,
  createdAt: '',
  updatedAt: '',
}));

const category = (slug: string): Category => demoCategories.find((c) => c.slug === slug)!;

type Seed = {
  name: string;
  slug: string;
  price: number;
  categorySlug: string;
  image: string;
  description: string;
  benefits: string[];
  howToUse: string;
  warnings: string;
  bestseller?: boolean;
  featured?: boolean;
};

const SEEDS: Seed[] = [
  {
    name: 'Ayesha Bridal Cream',
    slug: 'ayesha-bridal-cream',
    price: 500,
    categorySlug: 'face-care',
    image: 'images/products/bridal-cream.webp',
    description:
      'A beauty-care favourite for a considered pre-bridal self-care routine. Use as directed on the product label.',
    benefits: [
      'A pre-bridal skincare step',
      'Leaves skin feeling cared for and comfortable',
      'Use as directed on the product label',
    ],
    howToUse: 'Follow the directions on the product label. Patch-test before first use.',
    warnings: 'For external use only. Avoid contact with eyes. Discontinue if irritation occurs.',
    bestseller: true,
    featured: true,
  },
  {
    name: 'Ayesha Night Cream',
    slug: 'ayesha-night-cream',
    price: 400,
    categorySlug: 'face-care',
    image: 'images/products/night-cream.webp',
    description:
      'A night-time skincare companion for a soft, nourished-feeling complexion as part of your evening routine.',
    benefits: [
      'An evening skincare step',
      'Leaves skin feeling soft and moisturised',
      'Use as directed on the product label',
    ],
    howToUse: 'Apply as directed on the product label as part of your evening routine.',
    warnings: 'For external use only. Avoid contact with eyes. Discontinue if irritation occurs.',
    bestseller: true,
  },
  {
    name: 'Ayesha Day Cream',
    slug: 'ayesha-day-cream',
    price: 300,
    categorySlug: 'face-care',
    image: 'images/products/day-cream.webp',
    description:
      'A simple daily-care step to leave skin feeling moisturised and comfortable through the day.',
    benefits: [
      'A simple daily skincare step',
      'Leaves skin feeling moisturised',
      'Use as directed on the product label',
    ],
    howToUse: 'Apply as directed on the product label as part of your morning routine.',
    warnings: 'For external use only. Avoid contact with eyes. Discontinue if irritation occurs.',
    featured: true,
  },
  {
    name: 'Ayesha Body Whitening Cream',
    slug: 'ayesha-body-whitening-cream',
    price: 500,
    categorySlug: 'body-care',
    image: 'images/products/body-whitening-cream.webp',
    description:
      'A daily body-care cream for a smooth, moisturised feel. Follow the directions on the product packaging.',
    benefits: [
      'A daily body-care step',
      'Leaves skin feeling smooth and moisturised',
      'Follow the directions on the packaging',
    ],
    howToUse: 'Apply as directed on the product packaging.',
    warnings: 'For external use only. Avoid contact with eyes. Discontinue if irritation occurs.',
  },
  {
    name: 'Ayesha Bridal Soap',
    slug: 'ayesha-bridal-soap',
    price: 200,
    categorySlug: 'soap-bars',
    image: 'images/products/bridal-soap.webp',
    description:
      'A soap-bar option for everyday cleansing and a little extra care in your bathing routine.',
    benefits: [
      'Everyday cleansing',
      'A considered pre-bridal bathing routine',
      'Leaves skin feeling fresh and clean',
    ],
    howToUse: 'Lather with water, massage gently and rinse thoroughly.',
    warnings: 'For external use only. Discontinue if irritation occurs.',
    featured: true,
  },
  {
    name: 'Ayesha Whitening Soap',
    slug: 'ayesha-whitening-soap',
    price: 100,
    categorySlug: 'soap-bars',
    image: 'images/products/whitening-soap.webp',
    description: 'An everyday cleansing soap to leave your skin feeling fresh and clean.',
    benefits: [
      'Everyday cleansing',
      'Leaves skin feeling fresh',
      'A simple addition to your bathing routine',
    ],
    howToUse: 'Lather with water, massage gently and rinse thoroughly.',
    warnings: 'For external use only. Discontinue if irritation occurs.',
    bestseller: true,
  },
  {
    name: 'Ayesha Loofah Body Tanning Soap',
    slug: 'ayesha-loofah-body-tanning-soap',
    price: 150,
    categorySlug: 'soap-bars',
    image: 'images/products/loofah-tanning-soap.webp',
    description:
      'A textured loofah-style soap for a refreshed bathing routine. Use gently and follow the product label.',
    benefits: [
      'Textured loofah-style cleansing',
      'A refreshed bathing routine',
      'Use gently and follow the product label',
    ],
    howToUse: 'Use gently in the bath or shower and rinse thoroughly. Follow the product label.',
    warnings: 'Use gently on the skin. Discontinue if irritation occurs.',
  },
  {
    name: 'Ayesha Pimple Soap',
    slug: 'ayesha-pimple-soap',
    price: 100,
    categorySlug: 'soap-bars',
    image: 'images/products/pimple-soap.webp',
    description:
      'A daily cleansing option for a simple skincare routine. Avoid use if irritation occurs.',
    benefits: [
      'Daily cleansing',
      'A simple skincare routine step',
      'Use as directed on the product label',
    ],
    howToUse: 'Lather with water, massage gently and rinse thoroughly.',
    warnings: 'For external use only. Avoid use if irritation occurs.',
  },
  {
    name: 'Ayesha Nila Soap',
    slug: 'ayesha-nila-soap',
    price: 150,
    categorySlug: 'soap-bars',
    image: 'images/products/nila-soap.webp',
    description: 'A distinctive Nila soap for everyday bathing and a fresh, clean feeling.',
    benefits: [
      'Everyday bathing',
      'Leaves skin feeling fresh and clean',
      'A simple addition to your routine',
    ],
    howToUse: 'Lather with water, massage gently and rinse thoroughly.',
    warnings: 'For external use only. Discontinue if irritation occurs.',
  },
  {
    name: 'Ayesha DeTan Pack',
    slug: 'ayesha-detan-pack',
    price: 100,
    categorySlug: 'face-care',
    image: 'images/products/detan-pack.webp',
    description:
      'A self-care pack to add to your skincare routine. Please follow the directions and precautions on the label.',
    benefits: [
      'An occasional self-care step',
      'Use as part of your skincare routine',
      'Follow the label directions and precautions',
    ],
    howToUse: 'Follow the directions on the pack. Patch-test before first use.',
    warnings: 'For external use only. Avoid contact with eyes. Discontinue if irritation occurs.',
    featured: true,
  },
  {
    name: 'Ayesha Face & Body Scrub',
    slug: 'ayesha-face-body-scrub',
    price: 100,
    categorySlug: 'face-and-body',
    image: 'images/products/face-body-scrub.webp',
    description:
      'A scrub for an occasional exfoliation step. Massage gently and avoid the eye area or irritated skin.',
    benefits: [
      'Occasional exfoliation',
      'For face and body use',
      'Massage gently and rinse thoroughly',
    ],
    howToUse: 'Massage gently onto damp skin, avoiding the eye area, then rinse thoroughly.',
    warnings: 'Do not use on irritated or broken skin. Avoid the eye area.',
    featured: true,
  },
  {
    name: 'Ayesha Moroccan Nila Face Wash',
    slug: 'ayesha-moroccan-nila-face-wash',
    price: 100,
    categorySlug: 'face-care',
    image: 'images/products/moroccan-nila-face-wash.webp',
    description:
      'A face-care cleanser for your daily routine. Rinse thoroughly and follow with your preferred moisturiser.',
    benefits: [
      'Daily face cleansing',
      'Leaves skin feeling fresh',
      'Follow with your preferred moisturiser',
    ],
    howToUse: 'Apply to damp skin, massage gently and rinse thoroughly. Follow with moisturiser.',
    warnings: 'For external use only. Avoid contact with eyes. Discontinue if irritation occurs.',
  },
  {
    name: 'Ayesha Vitamin C Face Wash',
    slug: 'ayesha-vitamin-c-face-wash',
    price: 100,
    categorySlug: 'face-care',
    image: 'images/products/vitamin-c-face-wash.webp',
    description:
      'A face wash for everyday cleansing. Use as directed and discontinue use if irritation occurs.',
    benefits: [
      'Everyday face cleansing',
      'A fresh, clean feeling',
      'Use as directed on the product label',
    ],
    howToUse: 'Apply to damp skin, massage gently and rinse thoroughly.',
    warnings: 'For external use only. Avoid contact with eyes. Discontinue if irritation occurs.',
    featured: true,
  },
  {
    name: 'Ayesha Hair Oil',
    slug: 'ayesha-hair-oil',
    price: 200,
    categorySlug: 'hair-care',
    image: 'images/products/hair-oil.webp',
    description:
      'An oil to make hair care feel like a simple, nourishing part of your regular routine.',
    benefits: [
      'A simple hair-care step',
      'Use as part of your regular routine',
      'Follow the directions on the product label',
    ],
    howToUse: 'Apply as directed on the product label. Use as part of your regular hair-care routine.',
    warnings: 'For external use only. Avoid contact with eyes. Discontinue if irritation occurs.',
    bestseller: true,
    featured: true,
  },
];

export const demoProducts: Product[] = SEEDS.map((p, index) => ({
  _id: `demo-${p.slug}`,
  name: p.name,
  slug: p.slug,
  description: p.description,
  price: p.price,
  compareAtPrice: null,
  size: '',
  category: category(p.categorySlug),
  images: [p.image],
  ingredients: [],
  benefits: p.benefits,
  howToUse: p.howToUse,
  warnings: p.warnings,
  variants: [],
  stockStatus: 'in_stock',
  bestseller: p.bestseller ?? false,
  featured: p.featured ?? false,
  seoTitle: `${p.name} | Ayesha Herbal & Beauty`,
  seoDescription: p.description.slice(0, 160),
  displayOrder: index + 1,
  archived: false,
  createdAt: '',
  updatedAt: '',
}));

const GALLERY_SEEDS: Array<Omit<GalleryItem, 'createdAt' | 'updatedAt'>> = [
  { _id: 'demo-g1', image: 'images/hero-products.webp', caption: 'Our everyday herbal beauty collection', externalUrl: INSTAGRAM, displayOrder: 1, active: true },
  { _id: 'demo-g2', image: 'images/products/bridal-cream.webp', caption: 'Bridal care, made with love', externalUrl: INSTAGRAM, displayOrder: 2, active: true },
  { _id: 'demo-g3', image: 'images/products/bridal-soap.webp', caption: 'Handmade soap bars', externalUrl: INSTAGRAM, displayOrder: 3, active: true },
  { _id: 'demo-g4', image: 'images/products/face-body-scrub.webp', caption: 'A little self-care ritual', externalUrl: INSTAGRAM, displayOrder: 4, active: true },
  { _id: 'demo-g5', image: 'images/products/hair-oil.webp', caption: 'Simple hair care', externalUrl: INSTAGRAM, displayOrder: 5, active: true },
  { _id: 'demo-g6', image: 'images/products/vitamin-c-face-wash.webp', caption: 'Everyday face care', externalUrl: INSTAGRAM, displayOrder: 6, active: true },
];

export const demoGallery: GalleryItem[] = GALLERY_SEEDS.map((g) => ({
  ...g,
  createdAt: '',
  updatedAt: '',
}));

export const demoPublicSettings: PublicSettings = {
  businessName: 'Ayesha Herbal & Beauty',
  whatsappNumber: '+919892934245',
  instagramUrl: INSTAGRAM,
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
    story:
      'Ayesha Herbal & Beauty began with a simple idea: everyday beauty care should feel gentle, personal and easy to keep up with. From bridal creams and handmade soaps to face washes, scrubs and hair oil, the collection is made for simple routines and small moments of self-care.\n\nEvery order is handled personally on WhatsApp, so you can ask questions, confirm availability and get guidance before you buy.',
    founderImageUrl: '',
  },
  announcements: { enabled: false, text: '' },
};

/**
 * First-party catalogue for Ayesha Herbal & Beauty.
 *
 * Source of truth: the brand's own live storefront and product photography
 * (ayeshaherbalandbeauty.com), supplied/owned by the client. Names, prices,
 * descriptions and images below match that catalogue. Benefits are written in
 * neutral, everyday-care language — no medical or guaranteed-result claims.
 *
 * Idempotent: existing categories and products are never overwritten.
 */
import { Category, GalleryItem, Product } from '../models/index.js';

type CategorySeed = {
  name: string;
  slug: string;
  description: string;
  image: string;
};

type ProductSeed = {
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

const CATEGORIES: CategorySeed[] = [
  {
    name: 'Face Care',
    slug: 'face-care',
    description: 'Creams, face washes and packs for a simple everyday skincare routine.',
    image: 'images/products/bridal-cream.webp',
  },
  {
    name: 'Soap Bars',
    slug: 'soap-bars',
    description: 'Everyday cleansing bars for your bathing routine.',
    image: 'images/products/bridal-soap.webp',
  },
  {
    name: 'Body Care',
    slug: 'body-care',
    description: 'Body creams made for a smooth, moisturised feel.',
    image: 'images/products/body-whitening-cream.webp',
  },
  {
    name: 'Face & Body',
    slug: 'face-and-body',
    description: 'Multi-use essentials for face and body care.',
    image: 'images/products/face-body-scrub.webp',
  },
  {
    name: 'Hair Care',
    slug: 'hair-care',
    description: 'Nourishing hair-care essentials for your regular routine.',
    image: 'images/products/hair-oil.webp',
  },
];

const PRODUCTS: ProductSeed[] = [
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
    description:
      'An everyday cleansing soap to leave your skin feeling fresh and clean.',
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
    description:
      'A distinctive Nila soap for everyday bathing and a fresh, clean feeling.',
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

const GALLERY = [
  {
    image: 'images/hero-products.webp',
    caption: 'Our everyday herbal beauty collection',
  },
  {
    image: 'images/products/bridal-cream.webp',
    caption: 'Bridal care, made with love',
  },
  {
    image: 'images/products/bridal-soap.webp',
    caption: 'Handmade soap bars',
  },
  {
    image: 'images/products/face-body-scrub.webp',
    caption: 'A little self-care ritual',
  },
  {
    image: 'images/products/hair-oil.webp',
    caption: 'Simple hair care',
  },
  {
    image: 'images/products/vitamin-c-face-wash.webp',
    caption: 'Everyday face care',
  },
];

export async function seedCatalogue(): Promise<void> {
  const categoryIds = new Map<string, unknown>();
  let createdCategories = 0;
  let createdProducts = 0;

  for (const [index, category] of CATEGORIES.entries()) {
    let doc = await Category.findOne({ slug: category.slug });
    if (!doc) {
      doc = await Category.create({ ...category, displayOrder: index + 1 });
      createdCategories++;
    }
    categoryIds.set(category.slug, doc._id);
  }

  for (const [index, product] of PRODUCTS.entries()) {
    const exists = await Product.findOne({ slug: product.slug });
    if (exists) continue;

    await Product.create({
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      compareAtPrice: null,
      size: '',
      category: categoryIds.get(product.categorySlug) ?? null,
      images: [product.image],
      ingredients: [],
      benefits: product.benefits,
      howToUse: product.howToUse,
      warnings: product.warnings,
      variants: [],
      stockStatus: 'in_stock',
      bestseller: product.bestseller ?? false,
      featured: product.featured ?? false,
      seoTitle: `${product.name} | Ayesha Herbal & Beauty`,
      seoDescription: product.description.slice(0, 160),
      displayOrder: index + 1,
      archived: false,
    });
    createdProducts++;
  }

  let createdGallery = 0;
  if (createdProducts > 0) {
    for (const [index, item] of GALLERY.entries()) {
      const exists = await GalleryItem.findOne({ image: item.image });
      if (exists) continue;
      await GalleryItem.create({
        ...item,
        externalUrl: 'https://www.instagram.com/ayeshaherbal_and_beauty/',
        displayOrder: index + 1,
        active: true,
      });
      createdGallery++;
    }
  }

  console.log(
    `✓ Catalogue: ${createdCategories} categories, ${createdProducts} products and ${createdGallery} gallery items created` +
      (createdCategories || createdProducts || createdGallery ? '' : ' (already present)')
  );
}

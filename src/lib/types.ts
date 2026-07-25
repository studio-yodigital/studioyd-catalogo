export type Section = {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
  active: boolean;
};

export type Product = {
  id: string;
  sectionId: string;
  name: string;
  description: string;
  priceLabel: string | null;
  imageUrl: string | null;
  whatsappMessage: string;
  benefits: string | null;
  badgeLabel: string | null;
  featured: boolean;
  sortOrder: number;
  active: boolean;
};

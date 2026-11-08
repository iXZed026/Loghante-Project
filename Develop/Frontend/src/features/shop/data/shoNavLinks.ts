import { museumParts, type IMuseumPart } from "@/features/loghante(root)/data/museumParts";
import {
  productCategories,
  type IProductCategory,
} from "./productCategories";

export interface IShopNavLink {
  id: number;

  name: {
    en: string;
    fa: string;
  };

  path: string;

  museumParts?: IMuseumPart[];
  productCategories?: IProductCategory[];
  category?: string,
}

export const shopNavLinks: IShopNavLink[] = [
  {
    id: 1,
    name: {
      en: "Shop Home Page",
      fa: "صفحه اصلی فروشگاه",
    },
    path: "/shop",
  },
  {
    id: 7,
    name: {
      en: "Home Page",
      fa: "صفحه اصلی",
    },
    path: "/",
  },
  {
    id: 2,
    name: {
      en: "Products",
      fa: "محصولات",
    },
    path: "/shop",
  },
  {
    id: 3,
    name: {
      en: "Museums",
      fa: "مجموعه‌ها",
    },
    path: "/museum-parts",
    museumParts,
  },
  {
    id: 4,
    name: {
      en: "Product Categories",
      fa: "دسته‌بندی محصولات",
    },
    path: "/shop",
    productCategories,
    category: "new-products",
  },
  {
    id: 5,
    name: {
      en: "Explore Loghanteh",
      fa: "درباره لقانطه",
    },
    path: "/about",
  },
  {
    id: 6,
    name: {
      en: "Contact Us",
      fa: "تماس با ما",
    },
    path: "#footer",
  },
];

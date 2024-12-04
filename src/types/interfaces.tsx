export interface INavLinks {
  label: string;
  href: string;
}

export interface IProduct {
  name: string;
  price: number;
  rating: number;
  image: string[];
  discountPrice?: number
}

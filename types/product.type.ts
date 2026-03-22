export interface IProduct {
  dimensions: Dimensions;
  _id: string;
  title: string;
  price: number;
  cost: number;
  description: string;
  thumbnail: string;
  category: string[];
  stock: number;
  images: string[];
  discount: number;
  isActive: boolean;
  sizes: string[];
  weight: Weight;
  rating: number;
  reviewsCount: number;
  colors: [];
  versions: IVersion[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Dimensions {
  length: Weight;
  width: Weight;
  height: Weight;
  depth: Weight;
}

export interface Weight {
  value: number;
  unit: string;
}

export interface IVersion {
  version: IProduct;
  versionName: string;
}

export interface IProduct {
  discount: number;
  _id: string;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  category: string[];
  stock: number;
  images: string[];
  versions: IVersion[];
  rating: number;
  reviewsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVersion {
  version: IProduct;
  versionName: string;
  _id: string;
}

export interface IReviews {
  _id: string;
  product: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

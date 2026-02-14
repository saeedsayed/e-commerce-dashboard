export interface IOrder {
  pricing: Pricing;
  _id: string;
  user: User;
  items: Item[];
  coupon: Coupon;
  shippingMethod: ShippingMethod;
  status:
    | "pending_payment"
    | "payment_failed"
    | "processing"
    | "Confirmed"
    | "Shipped"
    | "Delivered"
    | "Cancelled"
    | "Attempted delivery"
    | "Refunded";
  paymentIntentId: string;
  createdAt: Date;
  updatedAt: Date;
  paidAt: Date;
  cancelledAt: Date;
  deliveredAt: Date;
  paymentDetails: PaymentDetails;
}

export interface Coupon {
  _id: string;
  code: string;
  description: string;
  discountType: string;
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount: number;
  startDate: Date;
  endDate: Date;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
}

export interface Item {
  product: Product;
  quantity: number;
}

export interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  category: string[];
  stock: number;
  images: string[];
  discount: number;
  versions: Version[];
  rating: number;
  reviewsCount: number;
  reviews: any[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Version {
  version: string;
  versionName: string;
  _id: string;
}

export interface PaymentDetails {
  method: string;
  amount: number;
  currency: string;
}

export interface Pricing {
  subTotal: number;
  shipping: number;
  discount: number;
  total: number;
}

export interface ShippingMethod {
  _id: string;
  name: string;
  description: string;
  cost: number;
  estimatedDeliveryDays: number;
  isActive: boolean;
  regions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  avatar: string;
  isVerified: boolean;
  role: string;
  cart: string;
  wishList: string;
  createdAt: Date;
  updatedAt: Date;
}

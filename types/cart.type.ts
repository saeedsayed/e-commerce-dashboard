import { IProduct } from "./product.type";

export interface ICart {
    _id:        string;
    products:   ICartItem[];
    totalPrice: number;
    createdAt:  Date;
    updatedAt:  Date;
}

export interface ICartItem {
    product: IProduct;
    quantity:  number;
    // color:     string;
}

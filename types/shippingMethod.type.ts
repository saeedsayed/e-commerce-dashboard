export interface IShippingMethod {
    _id:                   string;
    name:                  string;
    description:           string;
    cost:                  number;
    estimatedDeliveryDays: number;
    isActive:              boolean;
    regions:               string[];
    createdAt:             Date;
    updatedAt:             Date;
}

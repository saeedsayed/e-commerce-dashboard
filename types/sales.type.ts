export interface ISales {
    products:       Product[];
    totalUnitsSold: number;
    totalOrders:    number;
    date:           DateClass;
    totalRevenue:   number;
}

export interface DateClass {
    year: number;
    month: number;
    day: number;
}

export interface Product {
    id:        string;
    name:      string;
    thumbnail: string;
    unitsSold: number;
}

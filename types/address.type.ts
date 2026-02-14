export interface IAddress {
    _id:        string;
    user:       string;
    title:      string;
    fullName:   string;
    phone:      string;
    email:      string;
    street:    string;
    city:       string;
    state:      string;
    country:    string;
    postalCode: string;
    isDefault:  boolean;
    createdAt:  Date;
    updatedAt:  Date;
}

export interface IUser {
    _id:        string;
    fullName:   string;
    email:      string;
    avatar:     string;
    role:       "admin"|"customer";
    cart:       string;
    wishList:   string;
    createdAt:  Date;
    updatedAt:  Date;
    isVerified: boolean;
}

import NextAuth from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's id. */
            id: number;
            /** The user's name. */
            name: string;
            /** The user's name. */
            userName: string;
            /** The user's email. */
            email: string;
            /** The user's image. */
            image: string;
            /** The user's wishlist id. */
            wishlistId: number;
            /** The user's cart id. */
            cartId: number;
            /** The user's firstName. */
            firstName: string;
            /** The user's lastName. */
            lastName: string;
            /** The user's orders id. */
            ordersId: number[]
            /** The user's hashPassword. */
            hashPassword: string;
        }
    }
}
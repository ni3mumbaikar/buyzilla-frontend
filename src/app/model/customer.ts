export interface Customer {
    customerID: number,
    postalCode: number | undefined,
    customerName: string,
    address: string,
    city: string,
    country: string,
    email: string
    password?: string,
}
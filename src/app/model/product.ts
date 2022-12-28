import { Supplier } from "./supplier"

// Post or PUT product 
export interface ProductVo {
    productName: string,
    supplierID: number,
    productImage: string,
    price: number,
    unit: number
    productID: number
}

// Get all Products
export interface Product {
    productID: number | undefined
    productName: string,
    supplier: Supplier,
    productImage: string,
    price: number | undefined,
    unit: number | undefined
}
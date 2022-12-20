export interface ProductVo {
    productName: string,
    supplierID: number,
    productImage: string,
    price: number,
    unit: number
}

export interface Product extends ProductVo {
    productID: number
}
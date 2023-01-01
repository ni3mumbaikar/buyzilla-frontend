export interface OrderDetails {
    productID: number | undefined,
    quantity: number
}

export interface Order {
    shipperID: number,
    date: string,
    customerID: number,
    orderDetailVos: OrderDetails[],
}
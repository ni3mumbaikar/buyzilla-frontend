import { Shipper } from "./shipper";
import { Customer } from "./customer"
import { Product } from "./product";

export interface OrderDetailsVo {
    productID: number | undefined,
    quantity: number
}

export interface OrderDetails {
    product: Product
    quantity: number
}

export interface OrderVo {
    orderID?: number,
    shipperID: number,
    date: string,
    customerID: number,
    orderDetailVos: OrderDetailsVo[],
}

export interface Order {
    orderID?: number,
    shipper: Shipper,
    date: string,
    customer: Customer,
    orderDetails: OrderDetails[],
}
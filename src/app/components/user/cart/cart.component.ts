import { Component, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { OrderVo, OrderDetailsVo } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { defaultMixin } from 'src/app/config/default-mixin';
import { ApiShippersService } from 'src/app/core/services/api-shippers.service';
import { ApiOrdersService } from 'src/app/core/services/api-orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartProductList: Product[] = [];
  cartOrderDetails: OrderDetailsVo[] = [];
  cid: number | undefined;
  @ViewChild('cartModal') modalRef!: ElementRef;
  @ViewChild('cartForm') form!: ElementRef;
  cartModalElement!: HTMLElement;
  formElement!: HTMLFormElement;
  cartTotal: number = 0;

  constructor(private cartService: CartService, private shipperService: ApiShippersService, private orderService: ApiOrdersService) {
    this.cartProductList = cartService.cartProducts;
    this.generateOrderDetails();
    this.setTotal();
    console.log('cart:', this.cartProductList);
    this.cartService.cartModifiedSubject.subscribe(cart => {
      this.cartProductList = cart;
      this.generateOrderDetails();
      this.setTotal();
    })
  }

  removeFromCart(product: Product) {
    this.cartService.removeProduct(product);
  }

  ngAfterViewInit() {
    if (this.cartProductList && this.cartProductList.length >= 1) {
      this.formElement = this.form.nativeElement as HTMLFormElement
      this.setUpOnOrder();
    }
  }

  setUpOnOrder() {
    this.formElement.onsubmit = async () => {
      const data = new FormData(this.formElement);
      let cid: number = Number(data.get('customerID'));
      let order: OrderVo = {
        customerID: cid,
        date: new Date().toISOString().split('T')[0],
        shipperID: await this.shipperService.getShipperID(),
        orderDetailVos: this.cartOrderDetails
      }
      this.placeOrder(order)

      return false; // prevent reload
    }
  }

  placeOrder(order: OrderVo) {
    this.orderService.post(order).subscribe(result => {
      if (result['ok']) {

        defaultMixin.fire({
          icon: 'success',
          title: 'Order placed'
        })

        this.cartService.clearCart();

      }
    })
  }

  getShipperID() {
    async () => {
      this.shipperService.getShipperID().then(id => { return id }).catch(err => { return err })
    }
  }

  generateOrderDetails() {
    this.cartOrderDetails = [];
    this.cartProductList!.forEach(element => {
      this.cartOrderDetails.push(
        {
          productID: element.productID,
          quantity: 1
        }
      )
    });
  }

  setTotal() {
    this.cartTotal = 0;
    this.cartProductList.forEach(element => {
      this.cartTotal += element.price!;
    });
  }

  getQuantity(id: number | undefined) {
    return this.cartOrderDetails?.filter(p => p.productID === id)[0].quantity
  }

  closemodal() {
    (this.modalRef.nativeElement as HTMLElement).style.display = 'none';
  }

  openmodal() {
    (this.modalRef.nativeElement as HTMLElement).style.display = 'inline-flex';
  }

  checkout() {
    this.openmodal()
  }

}
import { Injectable } from '@angular/core';
import { Product } from 'src/app/model/product';
import { Subject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartProducts: Product[] = [];
  cartModifiedSubject: Subject<Product[]> = new Subject();

  constructor() {
    if (localStorage.getItem("cartProducts") != undefined) {
      this.cartProducts = JSON.parse(localStorage.getItem("cartProducts")!)
    }
  }

  addProduct(product: Product) {
    this.cartProducts.push(product)
    this.updateLocalStorage();
    this.cartModifiedSubject.next(this.cartProducts)
  }

  removeProduct(product: Product) {
    this.cartProducts = this.cartProducts.filter(p => p.productID != product.productID)
    this.updateLocalStorage();
    this.cartModifiedSubject.next(this.cartProducts)
  }

  isProductInCart(product: Product) {
    if (this.cartProducts && this.cartProducts.filter(p => p.productID === product.productID).length >= 1) {
      return true;
    }
    return false;
  }

  updateLocalStorage() {
    localStorage.setItem("cartProducts", JSON.stringify(this.cartProducts));
    console.log(this.cartProducts);
  }

  clearCart() {
    this.cartProducts = []
    localStorage.setItem("cartProducts", JSON.stringify(this.cartProducts))
    this.cartModifiedSubject.next(this.cartProducts);
  }


}

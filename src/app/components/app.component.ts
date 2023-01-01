import { Component, ViewChild, ElementRef } from '@angular/core';
import { timeout } from 'rxjs';
import { ProductApiHttpService } from '../core/services/api-product.service'
import { Observable } from 'rxjs';
import { ProductVo, Product } from '../model/product'
import Swal from 'sweetalert2'
import { FormGroup } from '@angular/forms';
import { CartService } from '../core/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'buyzilla';
  isCartEmpty: boolean = true;
  len: number = 0;
  cartService: CartService;

  constructor(cartService: CartService) {
    this.cartService = cartService;
    this.setCartSubscriber();

  }

  setCartSubscriber() {

    if (this.cartService.cartProducts.length >= 1) {
      this.isCartEmpty = false;
      this.len = this.cartService.cartProducts.length;
    }

    this.cartService.cartModifiedSubject.subscribe(products => {
      if (products.length >= 1) {
        this.isCartEmpty = false;
        this.len = products.length;
      } else {
        this.isCartEmpty = true;
      }
    })
  }

}
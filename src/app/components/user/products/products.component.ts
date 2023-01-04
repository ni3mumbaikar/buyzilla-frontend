import { Component, ViewChild, ElementRef } from '@angular/core';
import { timeout } from 'rxjs';
import { ProductApiHttpService } from '../../../core/services/api-product.service'
import { Observable } from 'rxjs';
import { ProductVo, Product } from '../../../model/product'
import Swal from 'sweetalert2'
import { FormGroup } from '@angular/forms';
import { CartService } from 'src/app/core/services/cart.service';
import { defaultMixin } from 'src/app/config/default-mixin';

@Component({
  selector: 'app-products-component',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponentComponent {
  title = 'buyzilla';
  products: [Product] | undefined;
  ps: ProductApiHttpService;


  constructor(productservice: ProductApiHttpService, private cartService: CartService) {

    this.cartService = cartService;
    this.ps = productservice;

    productservice.get().subscribe(data => {
      console.log(data);
      this.products = data
    });

  }
  productInCart(product: Product) {
    return this.cartService.isProductInCart(product);
    // return false;
  }

  removeFromCart(product: Product) {
    return this.cartService.removeProduct(product);
  }

  addToCart(product: Product) {
    console.log('add method');

    this.cartService.addProduct(product)
  }

}

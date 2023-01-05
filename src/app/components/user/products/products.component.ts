import { Component, ViewChild, ElementRef } from '@angular/core';
import { timeout } from 'rxjs';
import { ProductApiHttpService } from '../../../core/services/api-product.service'
import { Observable } from 'rxjs';
import { ProductVo, Product } from '../../../model/product'
import Swal from 'sweetalert2'
import { FormGroup } from '@angular/forms';
import { CartService } from 'src/app/core/services/cart.service';
import { defaultMixin } from 'src/app/config/default-mixin';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-products-component',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponentComponent {
  title = 'buyzilla';
  products: [Product] | undefined;
  ps: ProductApiHttpService;
  user: User | null = null
  guestRoutes:any = [
    {label:'Sign In'}
  ]


  constructor(productservice: ProductApiHttpService, private cartService: CartService, private userService: UserService) {

    this.cartService = cartService;
    this.ps = productservice;

    productservice.get().subscribe(data => {
      console.log(data);
      this.products = data
    });

    userService.userChangeSubject.subscribe(user=> {
      if(user===null){
        
      }
    })

  }

  productInCart(product: Product) {
    return this.cartService.isProductInCart(product);
  }

  removeFromCart(product: Product) {
    return this.cartService.removeProduct(product);
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product)
  }

}

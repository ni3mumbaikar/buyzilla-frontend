import { Component, ContentChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductsComponentComponent } from '../products/products.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  isCartEmpty: boolean = true;
  len: number = 0;
  public activeTab = ProductsComponentComponent;
  profile:string = 'Login';

  constructor(private route: ActivatedRoute, private cartService: CartService) {
    this.setCartSubscriber();
  }

  ngOnInit() {
    this.route
      .data
      .subscribe(v => {
        if (v && v['component']) {
          this.activeTab = v['component']
        }
      });
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

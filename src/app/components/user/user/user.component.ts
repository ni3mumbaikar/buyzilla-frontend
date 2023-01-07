import { Component, ContentChild, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/model/user';
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
  user: User | null = null

  constructor(private route: ActivatedRoute, private router: Router, private cartService: CartService, private userService: UserService) {
    this.setCartSubscriber();

    userService.userChangeSubject.subscribe(user => {
      this.user = user;
      this.changeMenu();
    })
    this.user = userService.currentUser;
    this.changeMenu();



  }

  profileClick() {
    if ((this.user == null || this.user == undefined)) {
      this.router.navigate(['/signin'])
    }
  }

  signOut() {
    this.userService.signOut()
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

  changeMenu() {
    if (this.user === null || this.user == undefined) {
      console.log('user is null');
    } else {
      if (this.user && this.user.isAdmin) {
        console.log('Admin user');
        this.router.navigate(['/admin'])
      } else {
        console.log('customer');
      }
    }
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

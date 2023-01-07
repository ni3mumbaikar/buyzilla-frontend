import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponentComponent } from './components/user/products/products.component';
import { CartComponent } from './components/user/cart/cart.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { CustomersComponent } from './components/admin/customers/customers.component';
import { ShippersComponent } from './components/admin/shippers/shippers.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { UserComponent } from './components/user/user/user.component';
import { ProductsComponent } from './components/admin/products/products.component';
import { UserOrdersComponent } from './components/user/user-orders/user-orders.component';
import { SigninComponent } from './components/user/signin/signin.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponentComponent,
    CartComponent,
    OrdersComponent,
    CustomersComponent,
    ShippersComponent,
    AdminComponent,
    UserComponent,
    ProductsComponent,
    UserOrdersComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

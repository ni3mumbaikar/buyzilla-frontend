import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/user/cart/cart.component';
import { CustomersComponent } from './components/admin/customers/customers.component';
import { ProductsComponentComponent } from './components/user/products/products.component';
import { ShippersComponent } from './components/admin/shippers/shippers.component';
import { UserComponent } from './components/user/user/user.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { UserOrdersComponent } from './components/user/user-orders/user-orders.component';
import { SigninComponent } from './components/user/signin/signin.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: UserComponent },
  { path: 'orders', component: UserComponent, data: { component: UserOrdersComponent } },
  { path: 'cart', component: UserComponent, data: { component: CartComponent } },
  { path: 'signin', component: UserComponent, data: { component: SigninComponent } },
  { path: 'customers', component: AdminComponent, data: { component: CustomersComponent } },
  { path: 'allorders', component: AdminComponent, data: { component: OrdersComponent } },
  { path: 'shippers', component: AdminComponent, data: { component: ShippersComponent } },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

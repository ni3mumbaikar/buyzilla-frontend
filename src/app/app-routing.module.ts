import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CustomersComponent } from './components/customers/customers.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponentComponent } from './components/products/products.component';
import { ShippersComponent } from './components/shippers/shippers.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponentComponent },
  { path: 'cart', component: CartComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'shippers', component: ShippersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

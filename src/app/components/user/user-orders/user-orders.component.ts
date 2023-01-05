import { Component } from '@angular/core';
import { ApiCustomersService } from 'src/app/core/services/api-customers.service';
import { ApiOrdersService } from 'src/app/core/services/api-orders.service';
import { ProductApiHttpService } from 'src/app/core/services/api-product.service';
import { ApiShippersService } from 'src/app/core/services/api-shippers.service';
import { Order, OrderDetails } from 'src/app/model/order';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent {
  
  getPrice(arg: OrderDetails[]) {
    return arg.map(o => o.product.price).reduce((prev, cur) => prev! + cur!)
  }
  orders: Order[] = [];

  constructor(private orderService: ApiOrdersService,
    private shipperService: ApiShippersService,
    private customerService: ApiCustomersService,
    private productService: ProductApiHttpService) {
    orderService.getByCustomerID(42537).subscribe(res => {
      console.log(res);
      this.orders = res
    });
  }

}

import { Component } from '@angular/core';
import { ApiCustomersService } from 'src/app/core/services/api-customers.service';
import { Customer } from 'src/app/model/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  customers: Customer[] = []

  constructor(private customerService: ApiCustomersService) {
    customerService.get().subscribe(customers => this.customers = customers);
  }

}

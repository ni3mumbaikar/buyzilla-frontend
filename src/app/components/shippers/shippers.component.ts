import { Component } from '@angular/core';
import { ApiShippersService } from 'src/app/core/services/api-shippers.service';
import { Shipper } from 'src/app/model/shipper';

@Component({
  selector: 'app-shippers',
  templateUrl: './shippers.component.html',
  styleUrls: ['./shippers.component.css']
})
export class ShippersComponent {
  shippers: Shipper[] = []

  constructor(shipperService: ApiShippersService) {
    shipperService.get().subscribe(res => this.shippers = res);
  }

}

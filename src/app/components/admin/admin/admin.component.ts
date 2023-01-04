import { Component, ComponentRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  activeTab: any = ProductsComponent;

  constructor(private route: ActivatedRoute) {

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


}

import { Component, ComponentRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  activeTab: any = ProductsComponent;

  constructor(private route: ActivatedRoute, private userService: UserService) {

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

  signout() {
    this.userService.signOut();
  }


}

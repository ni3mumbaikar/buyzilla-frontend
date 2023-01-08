import { Component, ComponentRef, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ignoreElements } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  activeTab: any = ProductsComponent;
  innerWidth: any;
  @ViewChild('dropdown', { static: false }) dropdown!: ElementRef<any>;
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {

  }

  // profileClick() {
  //   if (this.dropdown.nativeElement as HTMLElement) {
  //     if ((this.dropdown.nativeElement as HTMLElement).style.display != 'block') {
  //       (this.dropdown.nativeElement as HTMLElement).setAttribute('data-popper-placement', 'bottom');

  //       (this.dropdown.nativeElement as HTMLElement).style.display = 'block';
  //       // (this.dropdown.nativeElement as HTMLElement).style.position = 'absolute';
  //     } else {
  //       (this.dropdown.nativeElement as HTMLElement).style.display = 'none';
  //     }
  //     console.log(String(this.innerWidth - 198.8));

  //     // (this.dropdown.nativeElement as HTMLElement).style.transform = 'translate3d(' + String(this.innerWidth - 198.8) + 'px, 68px, 0px)';
  //     // (this.dropdown.nativeElement as HTMLElement).style.inset = '0px auto auto 0px';
  //   }
  // }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.userService.currentUser?.isAdmin) {
      this.route
        .data
        .subscribe(v => {
          if (v && v['component']) {
            this.activeTab = v['component']
          }
        });
    }
    else {
      this.router.navigate(['/']);
    }
  }

  signout() {
    this.userService.signOut();
  }


}

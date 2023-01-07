import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAuthService } from 'src/app/core/services/api-auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { Customer } from 'src/app/model/customer';
import { LoginUser, User } from 'src/app/model/user';
import { defaultMixin } from 'src/app/config/default-mixin';
import { catchError, of } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ApiCustomersService } from 'src/app/core/services/api-customers.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  signup: boolean = false;
  user: Customer;
  @ViewChild('signInForm', { static: false }) signInForm!: ElementRef;
  @ViewChild('signUpForm', { static: false }) signUpForm!: ElementRef;
  @ViewChild('userBtn', { static: false }) userBtn!: ElementRef;
  @ViewChild('adminBtn', { static: false }) adminBtn!: ElementRef;
  confirmPassword: string = "";


  constructor(private authService: ApiAuthService,
    private customerService: ApiCustomersService,
    private userService: UserService,
    private router: Router) {
    this.user = {
      address: "",
      city: "",
      country: "",
      customerID: 0,
      customerName: "",
      email: "",
      postalCode: undefined,
      password: "",
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setFormListeners()
    }, 0);
  }

  instantiateCustomer() {
    this.user = {
      address: "",
      city: "",
      country: "",
      customerID: 0,
      customerName: "",
      email: "",
      postalCode: undefined,
      password: "",
    }
  }

  setsignup(bool: boolean) {
    this.instantiateCustomer();
    this.signup = bool;
    setTimeout(() => {
      this.setFormListeners()
    }, 0);
  }

  setFormListeners() {
    if (!this.signup) {
      if (this.signInForm) {
        let adminBtn = this.adminBtn.nativeElement as HTMLInputElement;
        // let userBtn = this.userBtn.nativeElement as HTMLInputElement;

        let signinform = this.signInForm.nativeElement as HTMLFormElement
        signinform.onsubmit = () => {
          if (adminBtn.checked) {
            this.authService.verifyAdmin(this.user)
              .subscribe({
                next: this.handleAdminUpdateResponse.bind(this),
                error: this.handleError.bind(this)
              })
          } else {
            this.authService.verifyUser(this.user)
              .subscribe({
                next: this.handleUserUpdateResponse.bind(this),
                error: this.handleError.bind(this)
              })
          }

        }
      }
    } else {
      if (this.signUpForm) {
        let signupform = this.signUpForm.nativeElement as HTMLFormElement
        signupform.onsubmit = () => {
          console.log(this.user);
          if (this.confirmPassword === this.user.password) {
            this.customerService.post(this.user).subscribe({
              next: this.signUp.bind(this),
              error: this.signUpError.bind(this)
            })
          } else {
            this.handleError({ error: 'Password and confirm password should match' })
          }
        }
      }

    }
  }

  handleError(err: any) {
    defaultMixin.fire({
      icon: 'error',
      timerProgressBar: true,
      timer: 1000,
      title: err.error
    })
  }

  handleAdminUpdateResponse(res: any) {
    if (res.ok) {
      this.user = res.body;
      defaultMixin.fire({
        icon: 'success',
        timerProgressBar: true,
        timer: 1000,
        title: 'Authentication successful'
      })
    }
    setTimeout(() => {
      this.signInAsAdmin({
        isAdmin: true,
        userid: res.adminid,
        userName: res.email
      })
    }, 1000)
  }

  handleUserUpdateResponse(res: any) {
    if (res.ok) {
      this.user = res.body;
      defaultMixin.fire({
        icon: 'success',
        timerProgressBar: true,
        timer: 1000,
        title: 'Authentication successful'
      })
    }
    setTimeout(() => {

      this.signIn()
    }, 1000)
  }

  signIn() {
    this.userService.setCustomer(this.user);
  }

  signUp(res: any) {
    if (res.ok) {
      defaultMixin.fire({
        icon: 'success',
        timerProgressBar: true,
        timer: 1000,
        title: 'Regsitration successful'
      })
    }
    this.router.navigate(['/'])
    setTimeout(() => { window.location.reload() }, 0)
  }

  signUpError(err: any) {
    defaultMixin.fire({
      icon: 'error',
      timerProgressBar: true,
      timer: 2000,
      title: err.error
    })
  }

  signInAsAdmin(admin: User) {
    this.userService.setAdmin(admin);
  }


}

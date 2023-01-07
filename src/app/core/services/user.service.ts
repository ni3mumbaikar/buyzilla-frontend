import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user';
import { isGeneratorFunction } from 'util/types';
import { threadId } from 'worker_threads';
import { Router } from "@angular/router"
import { Subject } from 'rxjs'
import { Customer } from 'src/app/model/customer';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User | null = null;
  userChangeSubject: Subject<User | null> = new Subject();

  constructor(private router: Router) {
    if (localStorage.getItem('buyzilla_user') != undefined && localStorage.getItem('buyzilla_user') != null) {
      this.currentUser = JSON.parse(localStorage.getItem('buyzilla_user')!)
    }
    this.userChangeSubject.next(this.currentUser);
  }

  setCustomer(customer: Customer) {
    let user: User = {
      isAdmin: false,
      userid: customer.customerID,
      userName: customer.customerName
    }
    localStorage.setItem('buyzilla_user', JSON.stringify(user));
    this.currentUser = user;
    this.userChangeSubject.next(this.currentUser)
    this.router.navigate(['/'])
    setTimeout(() => {
      window.location.reload();
    }, 0);
  }

  public setAdmin(user: User) {
    localStorage.removeItem("buyzilla_user");
    this.currentUser = user;
    this.userChangeSubject.next(user)
    localStorage.setItem('buyzilla_user', JSON.stringify(this.currentUser));
    this.router.navigate(['/admin'])
    setTimeout(() => {
      window.location.reload();
    }, 0);
  }

  signOut() {
    localStorage.removeItem("buyzilla_user");
    this.currentUser = null;
    this.userChangeSubject.next(this.currentUser)
    this.router.navigate(['/'])
    setTimeout(() => {
      window.location.reload();
    }, 0);

  }
}

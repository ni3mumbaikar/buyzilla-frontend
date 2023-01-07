import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap, throwError } from 'rxjs';
import { Constants } from 'src/app/config/constants';
import { Customer } from 'src/app/model/customer';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  url: string = Constants.AUTH_API_ENDPOINT;
  adminurl: string = Constants.ADMIN_AUTH_API_ENDPOINT;


  constructor(private http: HttpClient) {

  }

  verifyUser(user: Customer) {
    return this.http.post(this.url, user, { observe: 'response' }).pipe(tap(res => {
      if (res.ok) {

      }
    }))
  }

  verifyAdmin(user: Customer) {
    console.log(user);

    let admin = {
      email: user.email,
      password: user.password
    }
    return this.http.post(this.adminurl, admin, { observe: 'response' }).pipe(tap(res => {
      if (res.ok) {

      }
    }))
  }

}

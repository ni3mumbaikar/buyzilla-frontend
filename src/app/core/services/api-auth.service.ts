import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap, throwError } from 'rxjs';
import { Constants } from 'src/app/config/constants';
import { Customer } from 'src/app/model/customer';
import { SHA3 } from 'sha3';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  url: string = Constants.AUTH_API_ENDPOINT;
  adminurl: string = Constants.ADMIN_AUTH_API_ENDPOINT;


  constructor(private http: HttpClient) { }

  verifyUser(user: Customer) {
    const hash: SHA3 = new SHA3(256);
    hash.update(user.password!)
    user.password = String(hash.digest("hex"));
    return this.http.post(this.url, user, { observe: 'response' });
  }

  verifyAdmin(user: Customer) {
    const hash: SHA3 = new SHA3(256);
    let admin = {
      email: user.email,
      password: user.password
    }
    admin.password = String(hash.update(admin.password!).digest("hex"));
    return this.http.post(this.adminurl, admin, { observe: 'response' });
  }

}

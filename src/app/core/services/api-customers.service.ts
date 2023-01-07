import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { Constants } from '../../config/constants'
import { SHA3 } from 'sha3';

@Injectable({
  providedIn: 'root'
})

export class ApiCustomersService {

  url = Constants.CUSTOMER_API_ENDPOINT;
  customers: Customer[] = [];

  delete(customerID: number): Observable<HttpResponse<any>> {
    return this.http.delete(this.url + '/' + customerID, { observe: 'response' }).pipe(tap(response => {
      if (response.ok) {
        this.get().subscribe()
      }
    }));
  }

  public post(data: Customer): Observable<HttpResponse<any>> {
    if (!data.password) {
      data.password = "abc@123";
    }
    const hash: SHA3 = new SHA3(256);
    hash.update(data.password)
    data.password = hash.digest("hex");

    return this.http.post(this.url, [data], { observe: 'response' }).pipe(tap(response => {
      if (response.ok) {
        this.get().subscribe()
      }
    }));
  }

  put(tempCustomer: Customer) {
    return this.http.put(this.url, [tempCustomer], { observe: 'response' }).pipe(tap(response => {
      if (response.ok) {
        this.get().subscribe()
      }
    }));
  }

  constructor(private http: HttpClient) {
    this.get().subscribe()
  }

  get(): Observable<[Customer]> {
    return this.http.get<[Customer]>(this.url).pipe(tap(data => this.customers = data));
  }

}

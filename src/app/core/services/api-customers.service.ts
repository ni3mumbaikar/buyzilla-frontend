import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { Constants } from '../../config/constants'

@Injectable({
  providedIn: 'root'
})
export class ApiCustomersService {

  url = Constants.CUSTOMER_API_ENDPOINT;
  customers: Customer[] = [];

  constructor(private http: HttpClient) {
    this.get().subscribe()
  }

  get(): Observable<[Customer]> {
    return this.http.get<[Customer]>(this.url).pipe(tap(data => this.customers = data));
  }

}

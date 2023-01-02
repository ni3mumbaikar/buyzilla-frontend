import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, OrderVo } from 'src/app/model/order';
import { Observable } from 'rxjs'
import { Constants } from 'src/app/config/constants';

@Injectable({
  providedIn: 'root'
})
export class ApiOrdersService {

  url = Constants.ORDER_API_ENDPOINT;

  constructor(private httpClient: HttpClient) { }

  public post(data: OrderVo): Observable<HttpResponse<any>> {
    return this.httpClient.post(this.url, data, { observe: 'response' })
  }

  public get(): Observable<[Order]> {
    return this.httpClient.get<[Order]>(this.url)
  }

}

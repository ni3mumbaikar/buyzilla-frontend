import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Shipper } from 'src/app/model/shipper';
import { Constants } from '../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class ApiShippersService {

  base_url = Constants.SHIPPER_API_ENDPOINT;
  shippers: Shipper[] = [];



  constructor(private httpClient: HttpClient) {
    this.get().subscribe()
  }

  getShipperID(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.getShippers().subscribe(res => {
        console.log(res);
        if (res !== undefined) {
          resolve(res[Math.floor(Math.random() * res.length)].shipperID) //get random element from the array
        } else {
          reject(-1)
        }
      })
    });
  }

  getShippers(): Observable<[Shipper]> {
    console.log('inside shipper service get');
    return this.httpClient.get<[Shipper]>(this.base_url);
  }

  public get(): Observable<[Shipper]> {
    return this.httpClient.get<[Shipper]>(this.base_url).pipe(
      tap(data => {
        this.shippers = data;
        // this.product_subject.next(data)
      })
    );
  }


}

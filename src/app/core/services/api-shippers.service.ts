import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shipper } from 'src/app/model/shipper';
import { Constants } from '../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class ApiShippersService {

  base_url = Constants.SHIPPER_API_ENDPOINT;

  constructor(private httpClient: HttpClient) { }

  getShipperID(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.getShippers().subscribe(res => {
        console.log(res);
        if (res !== undefined) {
          resolve(res[Math.floor(Math.random() * res.length)].shipperID)
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

}

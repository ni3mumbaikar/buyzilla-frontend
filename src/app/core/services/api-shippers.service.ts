import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Shipper } from 'src/app/model/shipper';
import { Constants } from '../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class ApiShippersService {



  base_url = Constants.SHIPPER_API_ENDPOINT;
  shippers: Shipper[] = [];
  shippersModified = new Subject<Shipper[]>;


  put(shippper: Shipper) {
    return this.httpClient.put(this.base_url, shippper, { observe: 'response', responseType:'text' }).pipe(tap(response => {
      if (response.ok) {
        this.get().subscribe()
      }
    }));
  }

  post(shippper: Shipper) {
    return this.httpClient.post(this.base_url, shippper, { observe: 'response' }).pipe(tap(response => {
      if (response.ok) {
        this.get().subscribe()
      }
    }));
  }

  constructor(private httpClient: HttpClient) {
    this.get().subscribe(list => {
      this.shippers = list;
    })
  }

  delete(sid: number) {
    return this.httpClient.delete(this.base_url + '/' + sid, { observe: 'response' })
  }

  getShipperID(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.getShippers().subscribe(res => {
        console.log(res);
        if (res !== undefined) {
          resolve(res[Math.floor(Math.random() * res.length)].shipperID!) //get random element from the array
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
        this.shippersModified.next(this.shippers)
      })
    );
  }


}

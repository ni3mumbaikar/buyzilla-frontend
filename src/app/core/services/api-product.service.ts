// Angular Modules 
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Constants } from '../../config/constants';
import { Product, ProductVo } from 'src/app/model/product';
import { Subject, Observable, tap } from 'rxjs';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class ProductApiHttpService {
    url = Constants.PRODUCT_API_ENDPOINT;
    products: [Product] | undefined;
    product_subject = new Subject<[Product]>();
    constructor(
        // Angular Modules 
        private http: HttpClient
    ) {
        this.get().subscribe()
    }

    public get(): Observable<[Product]> {
        return this.http.get<[Product]>(this.url).pipe(
            tap(data => {
                this.products = data;
                this.product_subject.next(data)
            })
        );
    }

    public post(data: [ProductVo]): Observable<HttpResponse<any>> {
        return this.http.post(this.url, data, { observe: 'response' }).pipe(tap(response => {
            console.log(data);

            if (response.ok) {
                this.get().subscribe()
            }
        }));
    }

    public put(data: ProductVo, options?: any): Observable<HttpResponse<any>> {
        return this.http.put(this.url, [data], { observe: 'response' }).pipe(tap(response => {
            if (response.ok) {
                this.get().subscribe()
            }
        }));
    }

    public delete(pid: number): Observable<HttpResponse<any>> {
        return this.http.delete(this.url + '/' + pid, { observe: 'response' }).pipe(tap(response => {
            if (response.ok) {
                this.get().subscribe()
            }
        }));
    }

}
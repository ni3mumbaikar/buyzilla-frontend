// Angular Modules 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Constants } from '../../config/constants';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class ProductApiHttpService {
    url = Constants.PRODUCT_API_ENDPOINT;
    constructor(
        // Angular Modules 
        private http: HttpClient
    ) {}
    public get() {
        return this.http.get(this.url);
    }
    public post(data: any, options?: any) {
        return this.http.post(this.url, data, options);
    }
    // public put( data: any, options?: any) {
    //     return this.http.put(this.url, data, options);
    // }
    // public delete( options?: any) {
    //     return this.http.delete(this.url, options);
    // }
}
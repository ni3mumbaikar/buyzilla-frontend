import { Component } from '@angular/core';
import { timeout } from 'rxjs';
import {ProductApiHttpService} from '../core/services/api-product.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'buyzilla';
  products:any;
  constructor(productservice : ProductApiHttpService) { 
    productservice.get().subscribe(data => {
      console.log(data);
      this.products = data
    });
    
  }

  
}


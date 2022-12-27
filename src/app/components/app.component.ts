import { Component, ViewChild, ElementRef } from '@angular/core';
import { timeout } from 'rxjs';
import { ProductApiHttpService } from '../core/services/api-product.service'
import { Observable } from 'rxjs';
import { ProductVo, Product } from '../model/product'
import Swal from 'sweetalert2'
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'buyzilla';

  constructor() { }
}
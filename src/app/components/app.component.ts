import { Component } from '@angular/core';
import { timeout } from 'rxjs';
import { ProductApiHttpService } from '../core/services/api-product.service'
import { Observable } from 'rxjs';
import { ProductVo } from '../model/product'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'buyzilla';
  products: any;
  showModal: boolean = false;
  ps: ProductApiHttpService;
  constructor(productservice: ProductApiHttpService) {
    this.ps = productservice;
    productservice.get().subscribe(data => {
      console.log(data);
      this.products = data

      const form = document.querySelector('form')!;

      form.onsubmit = (_) => {
        const data = new FormData(form);
        console.log(data);

        const product: ProductVo = {
          price: data.get('price') as unknown as number,
          productName: data.get('name') as string,
          productImage: data.get('primage') as string,
          supplierID: data.get('supplier') as unknown as number,
          unit: data.get('unit') as unknown as number
        }

        productservice.post([product]).subscribe(result => {
          setTimeout(() => {
            // const productModal = document.getElementById('product-modal')!;
            document.getElementById("closeproductmodal")!.click();
          }, 200)
          console.log(result);
          Swal.fire(
            'Product Added',
            product.productName,
            'success'
          )
          this.reloadProdutcs();
        })


        return false; // prevent reload
      };

    });
  }

  reloadProdutcs() {
    this.ps.get().subscribe(data => {
      this.ps.get().subscribe(data => {
        console.log(data);
        this.products = data
      });

    });

  }
}
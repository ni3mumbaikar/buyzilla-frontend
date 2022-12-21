import { Component } from '@angular/core';
import { timeout } from 'rxjs';
import { ProductApiHttpService } from '../core/services/api-product.service'
import { Observable } from 'rxjs';
import { ProductVo, Product } from '../model/product'
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

  mouseEnter(pid: any) {
    let className = 'delete' + pid as string;
    const element = <HTMLElement>document.getElementsByClassName(className)[0];
    element.style.visibility = 'visible';
  }

  mouseLeave(pid: any) {
    let className = 'delete' + pid as string;
    const element = <HTMLElement>document.getElementsByClassName(className)[0];
    element.style.visibility = 'hidden';
  }

  deleteImage(product: Product) {
    Swal.fire({
      title: 'Delete Product',
      text: "Are you sure that you want to delete " + product.productName,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ps.delete(product.productID).subscribe(result => {
          console.log(result);

          Swal.fire(
            'Deleted!',
            'Product ' + product.productName + ' has been deleted.',
            'success'
          ).then(() => {
            this.reloadProdutcs();
          })
        })
      }
    })
  }

}
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
  products: [Product];
  ps: ProductApiHttpService;

  tempPrID: number;

  constructor(productservice: ProductApiHttpService) {
    this.ps = productservice;
    this.reloadProdutcs();
    productservice.get().subscribe(data => {
      console.log(data);
      this.products = data

      const form = document.querySelector('form')!;
      form.onsubmit = (_) => {
        let modalBtn = document.getElementsByClassName('submitbtn-modal')[0]! as HTMLButtonElement;
        if (modalBtn.innerText.startsWith("Add")) {
          this.addNewProduct(form);
        }
        if (modalBtn.innerText.startsWith("Update")) {
          console.log('update');
          this.updateProduct(form);
        }
        return false; // prevent reload
      };

    });

  }

  updateProduct(form: any) {
    const data = new FormData(form);
    let tempProduct: ProductVo = {
      price: Number(data.get('price')),
      productName: data.get('name') as string,
      productImage: data.get('primage') as string,
      supplierID: Number(data.get('supplier')),
      unit: Number(data.get('unit')),
      productID: this.tempPrID
    }

    this.ps.put(tempProduct).subscribe((res) => {
      if (res.ok) {
        setTimeout(() => {
          document.getElementById("closeproductmodal")!.click();
        }, 200)
        Swal.fire(
          'Product Updated',
          tempProduct.productName,
          'success'
        ).then(() => {
          form.reset();
        })
      }
    })
  }

  addNewProduct(form: any) {
    const data = new FormData(form);
    console.log(data);

    let tempProduct: ProductVo = {
      price: data.get('price') as unknown as number,
      productName: data.get('name') as string,
      productImage: data.get('primage') as string,
      supplierID: data.get('supplier') as unknown as number,
      unit: data.get('unit') as unknown as number,
      productID: this.tempPrID
    }

    this.ps.post([tempProduct]).subscribe(result => {
      setTimeout(() => {
        document.getElementById("closeproductmodal")!.click();
      }, 200)
      console.log(result);
      Swal.fire(
        'Product Added',
        tempProduct.productName,
        'success'
      ).then(() => {
        form.reset();
      })
    })
  }

  // Setup project subject subscriber to change local list automatically
  reloadProdutcs() {
    this.ps.product_subject.subscribe(list => {
      this.products = list
    });
  }

  mouseEnter(pid: any) {
    let className = 'delete' + pid as string;
    let element = <HTMLElement>document.getElementsByClassName(className)[0];
    element.style.visibility = 'visible';
    className = 'edit' + pid as string;
    element = <HTMLElement>document.getElementsByClassName(className)[0];
    element.style.visibility = 'visible';
  }

  mouseLeave(pid: any) {
    let className = 'delete' + pid as string;
    let element = <HTMLElement>document.getElementsByClassName(className)[0];
    element.style.visibility = 'hidden';
    className = 'edit' + pid as string;
    element = <HTMLElement>document.getElementsByClassName(className)[0];
    element.style.visibility = 'hidden';
  }

  editImage(product: Product) {
    console.log(product);
    let modal = document.getElementsByClassName('modal-opener')[0]! as HTMLElement;
    modal.click();
    let modalBtn = document.getElementsByClassName('submitbtn-modal')[0]! as HTMLButtonElement;
    modalBtn.innerText = "Update Product"

    let arr = ['name', 'price', 'unit', 'supplier', 'primage']
    let arr2 = [product.productName, product.price as unknown as string, product.unit as unknown as string, product.supplier.supplierID as unknown as string, product.productImage]

    for (let i = 0; i < 5; i++) {
      (document.getElementById(arr[i]) as HTMLInputElement).value = arr2[i];
    }

    this.tempPrID = product.productID;
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
          if (result['ok']) {
            Swal.fire(
              'Deleted!',
              'Product ' + product.productName + ' has been deleted.',
              'success'
            )
          }
        })
      }
    })
  }

  resetForm() {
    let modalBtn = document.getElementsByClassName('submitbtn-modal')[0]! as HTMLButtonElement;
    modalBtn.innerText = "Add New Product"
    let arr = ['name', 'price', 'unit', 'supplier', 'primage']
    arr.forEach(element => {
      let e = document.getElementById(element) as HTMLInputElement;
      e.value = "";
    })
  }

}
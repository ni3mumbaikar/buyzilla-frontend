import { Component, ViewChild, ElementRef } from '@angular/core';
import { timeout } from 'rxjs';
import { ProductApiHttpService } from '../../core/services/api-product.service'
import { Observable } from 'rxjs';
import { ProductVo, Product } from '../../model/product'
import Swal from 'sweetalert2'
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-products-component',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponentComponent {
  title = 'buyzilla';
  products: [Product] | undefined;
  ps: ProductApiHttpService;
  tempPrID!: number;
  tempProduct: | Product;
  @ViewChild('productform', { static: true }) form!: ElementRef;
  @ViewChild('productmodal', { static: true }) modal!: ElementRef;
  formElement!: HTMLFormElement
  SwalToast: any;


  constructor(productservice: ProductApiHttpService) {

    this.SwalToast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2500,

      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    this.tempProduct = {
      price: 0,
      productID: 0,
      productImage: "",
      productName: "",
      supplier: {
        address: "",
        city: "",
        postalCode: 0,
        supplierID: 0,
        supplierName: ""
      },
      unit: 0
    };
    this.ps = productservice;
    this.reloadProdutcs();



    productservice.get().subscribe(data => {
      console.log(data);
      this.products = data



    });

  }

  ngAfterViewInit() {
    this.formElement = this.form.nativeElement as HTMLFormElement
    this.formElement.onsubmit = () => {

      let modalBtn = document.getElementsByClassName('submitbtn-modal')[0]! as HTMLButtonElement;
      if (modalBtn.innerText.startsWith("Add")) {
        this.addNewProduct();
      }
      if (modalBtn.innerText.startsWith("Update")) {
        this.updateProduct();
      }
      return false; // prevent reload
    };
  }

  updateProduct() {
    const data = new FormData(this.formElement);
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
          this.closemodal();
        }, 200)

        this.SwalToast.fire({
          icon: 'success',
          title: 'Product ' + tempProduct.productName + ' has been updated.'
        })
          .then(() => {
            this.formElement.reset();
          })
      }
    })
  }

  addNewProduct() {
    const data = new FormData(this.formElement);

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
        this.closemodal();
      }, 200)

      this.SwalToast.fire({
        icon: 'success',
        title: 'Product ' + tempProduct.productName + ' has been added.'
      })
        .then(() => {
          this.formElement.reset();
        })
    })
  }

  closemodal() {
    (this.modal.nativeElement as HTMLElement).style.display = 'none';
  }

  openmodal() {
    (this.modal.nativeElement as HTMLElement).style.display = 'inline-flex';
  }

  setmodalbtntext(str: any) {
    let modalBtn = document.getElementsByClassName('submitbtn-modal')[0]! as HTMLButtonElement;
    modalBtn.innerText = str;
  }

  // Setup project subject subscriber to change local list automatically
  reloadProdutcs() {
    this.ps.product_subject.subscribe(list => {
      this.products = list
    });
  }

  reloadlist() {
    this.ps.get().subscribe(list => {
      this.products = list;
    })
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

    this.tempProduct = product;
    this.openmodal();
    this.setmodalbtntext("Update Product")
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

            this.SwalToast.fire({
              icon: 'success',
              title: 'Product ' + product.productName + ' has been deleted.'
            })
          }
        })
      }
    })
  }



  resetForm() {
    this.tempProduct = {
      price: 0,
      productID: 0,
      productImage: "",
      productName: "",
      supplier: {
        address: "",
        city: "",
        postalCode: 0,
        supplierID: 0,
        supplierName: ""
      },
      unit: 0
    };
    this.setmodalbtntext("Add New Product")
    this.reloadlist(); //to discard un-updated values
    this.openmodal();
  }

}

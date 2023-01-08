import { Component, ElementRef, ViewChild } from '@angular/core';
import { error } from 'console';
import { defaultMixin } from 'src/app/config/default-mixin';
import { ApiCustomersService } from 'src/app/core/services/api-customers.service';
import { Customer } from 'src/app/model/customer';
import Swal from 'sweetalert2';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  customers: Customer[] = []
  tempCustomer: Customer;
  @ViewChild('customersform', { static: true }) form!: ElementRef;
  @ViewChild('customersmodal', { static: true }) modal!: ElementRef;
  @ViewChild('submitbtnmodal', { static: true }) btn!: ElementRef;

  formElement?: HTMLFormElement;

  constructor(private customerService: ApiCustomersService) {
    customerService.get().subscribe(customers => this.customers = customers);
    this.tempCustomer = {
      address: "",
      city: "",
      country: "",
      customerID: 0,
      customerName: "",
      email: "",
      postalCode: undefined
    }
  }

  handleError(err: any) {
    defaultMixin.fire({
      icon: 'error',
      timerProgressBar: true,
      timer: 1000,
      title: err.error
    })
  }

  loadCustomers() {
    this.customerService.get().subscribe(customers => this.customers = customers);
  }

  addNewCustomer() {
    this.tempCustomer = {
      address: "",
      city: "",
      country: "",
      customerID: 0,
      customerName: "",
      email: "",
      postalCode: undefined
    }
    this.openmodal(false);
  }

  deleteCustomer(customer: Customer) {
    Swal.fire({
      title: 'Delete Customer',
      text: "Are you sure that you want to delete " + customer.customerName,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.delete(customer.customerID!).subscribe({
          next: this.deleteCustomerResult.bind(this, customer),
          error: this.handleError.bind(this)
        })
      }
    })
  }

  deleteCustomerResult(res: any, customer: any) {
    if (res['ok']) {
      defaultMixin.fire({
        icon: 'success',
        title: 'Shipper ' + customer.customerName + ' removed.'
      })
      this.loadCustomers();
    }
  }

  editCustomer(customer: Customer) {
    this.tempCustomer = customer
    this.openmodal(true);
  }

  addNewCustomerResult(res: any) {
    if (res['ok']) {
      defaultMixin.fire({
        icon: 'success',
        text: 'User is registered'
      })
      this.closemodal();
    }
  }

  updateCustomerResult(res: any) {
    if (res['ok']) {
      defaultMixin.fire({
        icon: 'success',
        text: 'User is updated'
      })
    }
    this.closemodal();
  }

  openmodal(edit: boolean) {
    (this.modal.nativeElement as HTMLElement).style.display = 'inline-flex';
    this.formElement = this.form.nativeElement as HTMLFormElement;
    this.customerService.get().subscribe(customers => this.customers = customers);
    this.formElement.onsubmit = () => {
      if (!edit) {
        this.customerService.post(this.tempCustomer).subscribe({
          next: this.addNewCustomerResult.bind(this),
          error: this.handleError.bind(this)
        });
      } else {
        this.customerService.put(this.tempCustomer).subscribe({
          next: this.updateCustomerResult.bind(this),
          error: this.handleError.bind(this)
        });
      }
    }
  }

  closemodal() {
    this.loadCustomers();
    (this.modal.nativeElement as HTMLElement).style.display = 'none';
  }

}

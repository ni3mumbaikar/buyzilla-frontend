import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiShippersService } from 'src/app/core/services/api-shippers.service';
import { Shipper } from 'src/app/model/shipper';
import { defaultMixin } from 'src/app/config/default-mixin';
import Swal from 'sweetalert2';
import { sign } from 'crypto';
import { JsonPipe } from '@angular/common';
import { close } from 'inspector';

@Component({
  selector: 'app-shippers',
  templateUrl: './shippers.component.html',
  styleUrls: ['./shippers.component.css']
})
export class ShippersComponent {
  shippers: Shipper[] = []
  shipper: Shipper | undefined;
  @ViewChild('shippersform', { static: true }) form!: ElementRef;
  @ViewChild('shippersmodal', { static: true }) modal!: ElementRef;
  @ViewChild('submitbtnmodal', { static: true }) btn!: ElementRef;
  formElement!: HTMLFormElement

  constructor(private shipperService: ApiShippersService) {
    this.loadShippers();
    this.shipper = {
      phone: undefined,
      shipperID: undefined,
      shipperName: ""
    }
  }

  addNewShipper() {
    this.shipper = {
      phone: undefined,
      shipperID: undefined,
      shipperName: ""
    }
    this.openmodal(false, this.shipper!)
  }

  deleteShipper(shipper: Shipper) {
    Swal.fire({
      title: 'Delete Shipper',
      text: "Are you sure that you want to delete " + shipper.shipperName,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.shipperService.delete(shipper.shipperID!).subscribe(res => {
          if (res['ok']) {
            defaultMixin.fire({
              icon: 'success',
              title: 'Shipper ' + shipper.shipperName + ' deleted.'
            })
            this.loadShippers();
          }
        })
      }
    })
  }

  loadShippers() {
    this.shipperService.get().subscribe(res => this.shippers = res);
  }

  editShipper(shipper: Shipper) {
    this.shipper = shipper;
    this.openmodal(true, shipper);
  }

  openmodal(edit: boolean, shipper: Shipper |undefined) {
    
    // set form listener
    this.formElement = this.form.nativeElement as HTMLFormElement;
    this.formElement.onsubmit = () => {
      console.log('onsubmit');
      let modalBtn = this.btn.nativeElement as HTMLElement;
      if (!edit) {
        shipper = this.shipper
        this.shipperService.post(shipper!).subscribe(res=>{
          if (res['ok']){
            defaultMixin.fire({
              icon: 'success',
              title: 'Shipper ' + shipper!.shipperName + ' saved.'
            })
            this.closemodal();
          }
        });
      } else {
        this.shipperService.put(shipper!).subscribe(res=>{
          if (res['ok']){
            defaultMixin.fire({
              icon: 'success',
              title: 'Shipper ' + shipper!.shipperName + ' has been updated.'
            })
            this.closemodal();
          }
        });
      } return false; // prevent reload
    };

    //set modal
    (this.modal.nativeElement as HTMLElement).style.display = 'inline-flex';
    if (edit) {
      (this.btn.nativeElement as HTMLElement).innerText = 'Update Shipper Details';
    } else {
      (this.btn.nativeElement as HTMLElement).innerText = 'Add new shipper';
      this.shipper = {
        phone: undefined,
        shipperID: undefined,
        shipperName: ""
      }
    }
  }

  closemodal() {
    this.loadShippers();
    (this.modal.nativeElement as HTMLElement).style.display = 'none';
  }

}

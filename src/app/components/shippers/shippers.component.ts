import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiShippersService } from 'src/app/core/services/api-shippers.service';
import { Shipper } from 'src/app/model/shipper';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shippers',
  templateUrl: './shippers.component.html',
  styleUrls: ['./shippers.component.css']
})
export class ShippersComponent {
  shippers: Shipper[] = []
  shipper: Shipper | undefined;
  @ViewChild('shippersmodal', { static: true }) modal!: ElementRef;
  @ViewChild('submitbtnmodal', { static: true }) btn!: ElementRef;

  constructor(private shipperService: ApiShippersService) {
    this.loadShippers();
    this.shipper = {
      phone: undefined,
      shipperID: undefined,
      shipperName: ""
    }
  }

  addNewShipper() {
    this.openmodal(false)
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
    this.openmodal(true);
    this.shipper = shipper;
  }

  openmodal(edit: boolean) {

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
    // this.reloadlist(); //to discard un-updated values
  }

}

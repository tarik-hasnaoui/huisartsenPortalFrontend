import { Component, OnInit } from '@angular/core';
import {Prescription} from "../../../../model/prescription";
import {PrescriptionService} from "../../../../service/prescription.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-prescription',
  templateUrl: './list-prescription.component.html',
  styleUrls: ['./list-prescription.component.scss']
})
export class ListPrescriptionComponent implements OnInit {


  constructor(private router: Router, private service: PrescriptionService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshPrescriptionList();
  }

  editForm(pres: Prescription): void {
    localStorage.removeItem("editPresId");
    localStorage.setItem("editPresId", pres.prescriptionId.toString());
    this.router.navigate(['edit-prescription']);

  }


  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deletePrescription(id).subscribe(res => {
        this.service.refreshPrescriptionList();
        this.toastr.warning('Deleted successfully', 'Prescription Register');
      });
    }
  }

  addPrescription(): void {
    this.router.navigate(["add-prescription"]);
  };

}

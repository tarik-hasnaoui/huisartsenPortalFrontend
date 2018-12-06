import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PrescriptionService} from "../../../../service/prescription.service";
import {ToastrService} from "ngx-toastr";
import {Prescription} from "../../../../model/prescription";


@Component({
  selector: 'app-my-prescription',
  templateUrl: './my-prescription.component.html',
  styleUrls: ['./my-prescription.component.scss']
})
export class MyPrescriptionComponent implements OnInit {

  private patientPrescription: Prescription;

  constructor(private router: Router, private service: PrescriptionService, private toastr: ToastrService) {
  }

  ngOnInit() {
    let prescriptionId = localStorage.getItem("patientPresId");
    if (!prescriptionId) {
      alert("Invalid action.")
      this.router.navigate(['my-list-prescription']);
      return;
    }
    this.service.getPatientPrescriptionById(+prescriptionId)
      .subscribe(data => {
        this.patientPrescription = data;
      });

  }
}

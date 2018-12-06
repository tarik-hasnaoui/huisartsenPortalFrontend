import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PrescriptionService} from "../../../../service/prescription.service";
import {ToastrService} from "ngx-toastr";
import {KeycloakService} from "../../../../service/keycloakService";
import {Prescription} from "../../../../model/prescription";

@Component({
  selector: 'app-my-list-prescription',
  templateUrl: './my-list-prescription.component.html',
  styleUrls: ['./my-list-prescription.component.scss']
})
export class MyListPrescriptionComponent implements OnInit {

  userDetails: any = {};
  constructor(private router: Router, private service: PrescriptionService, private toastr: ToastrService, private kc: KeycloakService) { }

  async ngOnInit() {

    try {
      this.userDetails = await this.kc.loadProfile();
    } catch (e){
      console.log('Failed to load user details', e);
    }
    //console.log(this.userDetails.attributes.bsnNumber);
    this.service.patientPrescriptionList(this.userDetails.attributes.bsnNumber);
  }

  prescriptionDetails(prescriptionId: number): void {
    localStorage.setItem("patientPresId", prescriptionId.toString());
    this.router.navigate(['my-prescription']);
  }
}

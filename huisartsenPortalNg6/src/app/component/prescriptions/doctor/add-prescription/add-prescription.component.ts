import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PrescriptionService} from "../../../../service/prescription.service";
import {KeycloakService} from "../../../../service/keycloakService";
import {Router} from "@angular/router";


@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.scss']
})
export class AddPrescriptionComponent implements OnInit {

  prescriptionForm: FormGroup;
  userDetails: any = {};

  constructor(private _fb: FormBuilder, private router: Router, private service: PrescriptionService, private kc: KeycloakService) {
  }

  ngOnInit() {
    this.prescriptionForm = this._fb.group({
      prescriptionId: [],
      date: this.currentDate(),
      patient: this.addPatientGroup(),
      doctor: this.addDoctorGroup(),
      medications: this._fb.array([this.addMedicationGroup()])
    });

    this.userDetails = this.kc.loadProfile().then(data => {
      this.userDetails = data;
      console.log(this.userDetails.attributes.doctorBsnNumber[0]);
      this.prescriptionForm.patchValue({
        doctor: {
          bsnNumber: this.userDetails.attributes.doctorBsnNumber[0],
          firstName: this.userDetails.firstName,
          lastName: this.userDetails.lastName,
        }
      })
    });
  }
  currentDate() {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0,10);
  }
  // fromJsonDate(jDate): string {
  //   const bDate: Date = new Date(jDate);
  //   return bDate.toISOString().substring(0, 10);  //Ignore time
  // }

  addMedicationGroup() {
    return this._fb.group({
      id: [],
      name: [null, Validators.required],
    });
  }

  addPatientGroup() {
    return this._fb.group({
      id: [],
      bsnNumber: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
    });
  }

  addDoctorGroup() {
    return this._fb.group({
      id: [],
      bsnNumber: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
    });
  }

  addMedication() {
    this.medicationArray.push(this.addMedicationGroup());
  }

  removeMedication(index) {
    this.medicationArray.removeAt(index);
  }

  get medicationArray() {
    return <FormArray>this.prescriptionForm.get('medications');
  }

  onSubmit(prescriptionForm) {

    this.insertRecord(prescriptionForm);
    this.router.navigate(['list-prescription']);
  }


  insertRecord(prescriptionForm) {
    this.service
      .postPrescription(prescriptionForm.value)
      .subscribe(
        (r: Response) => {
          AddPrescriptionComponent.resetForm(prescriptionForm);
          this.service.refreshPrescriptionList();
        }
      );
  }

  private static resetForm(prescriptionForm) {
    if (prescriptionForm != null)
      prescriptionForm.reset();
  }

  get doctorBsnNumber() {
    return this.prescriptionForm.get('doctor').get('bsnNumber');
  }

  get doctorFirstName() {
    return this.prescriptionForm.get('doctor').get('firstName');
  }

  get doctorLastName() {
    return this.prescriptionForm.get('doctor').get('lastName');
  }

  get patientBsnNumber() {
    return this.prescriptionForm.get('patient').get('bsnNumber');
  }

  get patientFirstName() {
    return this.prescriptionForm.get('patient').get('firstName');
  }

  get patientLastName() {
    return this.prescriptionForm.get('patient').get('lastName');
  }


}

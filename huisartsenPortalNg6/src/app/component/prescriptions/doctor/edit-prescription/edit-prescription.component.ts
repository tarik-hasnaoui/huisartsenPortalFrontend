import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PrescriptionService} from "../../../../service/prescription.service";
import {KeycloakService} from "../../../../service/keycloakService";

@Component({
  selector: 'app-edit-prescription',
  templateUrl: './edit-prescription.component.html',
  styleUrls: ['./edit-prescription.component.scss']
})
export class EditPrescriptionComponent implements OnInit {

  editForm: FormGroup;

  constructor(private _fb: FormBuilder, private router: Router, private service: PrescriptionService, private kc: KeycloakService) {
  }

  ngOnInit() {
    let prescriptionId = localStorage.getItem("editPresId");
    if(!prescriptionId) {
      alert("Invalid action.")
      this.router.navigate(['list-prescription']);
      return;
    }
    this.editForm = this._fb.group({
      prescriptionId: [],
      date: this.currentDate,
      patient: this.addPatientGroup(),
      doctor: this.addDoctorGroup(),
      medications: this._fb.array([this.addMedicationGroup()])
    });
    this.service.getPrescriptionById(+prescriptionId)
      .subscribe( data => {
        this.editForm.setValue(data);
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
      bsnNumber: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
    });
  }

  addMedication() {
    this.medicationArray.push(this.addMedicationGroup());
  }

  removeMedication(index) {
    this.medicationArray.removeAt(index);
  }

  get medicationArray() {
    return <FormArray>this.editForm.get('medications');
  }

  onSubmit(prescriptionForm) {
    this.updateRecord(prescriptionForm);
    this.router.navigate(['list-prescription']);
  }

  updateRecord(prescriptionForm) {
    this.service.updatePrescription(prescriptionForm.value).subscribe(res => {
      //this.toastr.info('Updated successfully', 'Prescription Register');
      EditPrescriptionComponent.resetForm(prescriptionForm);
      this.service.refreshPrescriptionList();
    });
  }

  private static resetForm(prescriptionForm) {
    if (prescriptionForm != null)
      prescriptionForm.reset();
  }
  get doctorBsnNumber() {
    return this.editForm.get('doctor').get('bsnNumber');
  }
  get doctorFirstName() {
    return this.editForm.get('doctor').get('firstName');
  }
  get doctorLastName() {
    return this.editForm.get('doctor').get('lastName');
  }

  get patientBsnNumber() {
    return this.editForm.get('patient').get('bsnNumber');
  }
  get patientFirstName() {
    return this.editForm.get('patient').get('firstName');
  }
  get patientLastName() {
    return this.editForm.get('patient').get('lastName');
  }

}


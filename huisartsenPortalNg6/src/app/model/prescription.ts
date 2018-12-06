import {Patient} from "./patient";
import {Doctor} from "./doctor";
import {Medication} from "./medication";

export class Prescription {

  prescriptionId: number ;
  date: Date;
  patient: Patient;
  doctor: Doctor;
  medications: Medication[];


  constructor(prescriptionId: number, date: Date, patient: Patient, doctor: Doctor, medications: Medication[]) {
    this.prescriptionId = prescriptionId;
    this.date = date;
    this.patient = patient;
    this.doctor = doctor;
    this.medications = medications;
  }
}

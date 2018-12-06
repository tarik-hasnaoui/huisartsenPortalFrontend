import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {KeycloakService} from './keycloakService';
import {Prescription} from '../model/prescription';
import {Patient} from "../model/patient";


@Injectable()
export class PrescriptionService {

  private prescriptionBaseUrl = 'http://localhost:8765';
  private headers;
  prescription: Prescription;
  prescriptionList: Prescription[];
  patient: Patient;

  constructor(private http: HttpClient, private kc: KeycloakService) {
    this.kc.getToken()
      .then(token => {
        this.headers = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': "application/json",
          'Authorization': 'Bearer ' + token
        });
      })
      .catch(error => console.log(error));
  }

  postPrescription(prescription: Prescription) {
    return this.http.post(this.prescriptionBaseUrl + '/prescription/doctor/addPrescription', prescription, {withCredentials: true, headers: this.headers});
  }

  refreshPrescriptionList(){
    this.http.get(this.prescriptionBaseUrl + '/prescription/doctor/getAllPrescription', {withCredentials: true, headers: this.headers})
      .toPromise().then(res => this.prescriptionList = res as Prescription[]);
  }

  updatePrescription(prescription: Prescription) {
    return this.http.put(this.prescriptionBaseUrl + '/prescription/doctor/updatePrescription/' + prescription.prescriptionId, prescription, {withCredentials: true, headers: this.headers});

  }

  deletePrescription(id: number) {
    return this.http.delete(this.prescriptionBaseUrl + '/prescription/doctor/deletePrescription/' + id, {withCredentials: true, headers: this.headers});
  }

  getPrescriptionById(id : number) {
    return this.http.get<Prescription>(this.prescriptionBaseUrl + '/prescription/doctor/getPrescription/' + id, {withCredentials: true, headers: this.headers});
  }

  patientPrescriptionList(BsnNumber: String){
    this.http.get(this.prescriptionBaseUrl + '/prescription/patient/getAllPrescription/' + BsnNumber, {withCredentials: true, headers: this.headers})
      .toPromise().then(res => this.prescriptionList = res as Prescription[]);
  }

  getPatientPrescriptionById(id : number) {
    return this.http.get<Prescription>(this.prescriptionBaseUrl + '/prescription/patient/getPrescription/' + id, {withCredentials: true, headers: this.headers});
  }
}

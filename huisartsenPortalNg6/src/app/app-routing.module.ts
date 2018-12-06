import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddPrescriptionComponent} from "./component/prescriptions/doctor/add-prescription/add-prescription.component";
import {ListPrescriptionComponent} from "./component/prescriptions/doctor/list-prescription/list-prescription.component";
import {EditPrescriptionComponent} from "./component/prescriptions/doctor/edit-prescription/edit-prescription.component";
import {HomeComponent} from "./component/home/home.component";
import {MyListPrescriptionComponent} from "./component/prescriptions/patient/my-list-prescription/my-list-prescription.component";
import {MyPrescriptionComponent} from "./component/prescriptions/patient/my-prescription/my-prescription.component";


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "my-list-prescription", component: MyListPrescriptionComponent},
  {path: "my-prescription", component: MyPrescriptionComponent},
  { path: "add-prescription", component: AddPrescriptionComponent },
  { path: 'list-prescription', component: ListPrescriptionComponent },
  { path: 'edit-prescription', component: EditPrescriptionComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


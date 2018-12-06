import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakService } from './service/keycloakService';
import { HeaderComponent } from './component/layout/header/header.component';
import { FooterComponent } from './component/layout/footer/footer.component';
import { LayoutComponent } from './component/layout/layout/layout.component';
import { PrescriptionsComponent } from './component/prescriptions/prescriptions.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PrescriptionService} from './service/prescription.service';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AddPrescriptionComponent } from './component/prescriptions/doctor/add-prescription/add-prescription.component';
import { EditPrescriptionComponent } from './component/prescriptions/doctor/edit-prescription/edit-prescription.component';
import { ListPrescriptionComponent } from './component/prescriptions/doctor/list-prescription/list-prescription.component';
import { HomeComponent } from './component/home/home.component';
import { SidebarComponent } from './component/layout/sidebar/sidebar.component';
import { MyPrescriptionComponent } from './component/prescriptions/patient/my-prescription/my-prescription.component';
import { MyListPrescriptionComponent } from './component/prescriptions/patient/my-list-prescription/my-list-prescription.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    PrescriptionsComponent,
    AddPrescriptionComponent,
    EditPrescriptionComponent,
    ListPrescriptionComponent,
    HomeComponent,
    SidebarComponent,
    MyPrescriptionComponent,
    MyListPrescriptionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,

  ],
  providers: [
     KeycloakService,
    PrescriptionService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss']
})
export class PrescriptionsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

  }
  getPrescription(): void {
    this.router.navigate(["add-prescription"]);
  };
}

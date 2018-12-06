import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {KeycloakService} from '../../../service/keycloakService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private userDetails: any = {};
  constructor( private kc: KeycloakService) {


  }  ngOnInit() {

    this.kc.loadProfile().then(user => {
      this.userDetails = user;
    })

      // try {
      //    this.userDetails = this.kc.loadProfile();
      //   console.log(this.userDetails);
      // } catch (e){
      //   console.log('Failed to load user details', e);
      // }
  }

  logout() {
    this.kc.logout();
  }
}

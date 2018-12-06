import { Component, OnInit } from '@angular/core';
import {KeycloakService} from "../../../service/keycloakService";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private userDetails: any = {};
  roles: any = [];
  constructor( private kc: KeycloakService) {
  }

  async ngOnInit() {
    this.roles = await this.kc.getUserRoles(true);
    // console.log(this.roles[0]);

    try {
      this.userDetails = await this.kc.loadProfile();
    } catch (e){
      console.log('Failed to load user details', e);
    }
  }

  logout() {
    this.kc.logout();
  }
}

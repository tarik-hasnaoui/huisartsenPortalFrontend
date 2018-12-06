/**
 * Created by tarik on 8-11-2018.
 */

import { Injectable } from '@angular/core';

declare var Keycloak: any;
@Injectable()
export class KeycloakService {

   static auth: any = {};

    static init(): Promise<any> {

     KeycloakService.auth.loggedIn = false;

    return new Promise((resolve, reject) => {
      const config = {
        'url': 'http://192.168.99.100:8000/auth',
        'realm': 'huisartsPortal',
        'clientId': 'keycloak-authentication-service',
      };
      const keycloakAuth = new Keycloak(config);
      keycloakAuth.init({ onLoad: 'login-required' })
        .success(() => {
          KeycloakService.auth.loggedIn = true;
          KeycloakService.auth.authz = keycloakAuth;
          KeycloakService.auth.logoutUrl = keycloakAuth.authServerUrl + "/realms/huisartsPortal/protocol/openid-connect/logout?redirect_uri=http://localhost:4200/";

          resolve();
        })
        .error(() => {
          reject();
        });
    });

  }

  logout() {
    console.log('*** LOGOUT');
    KeycloakService.auth.loggedIn = false;
    KeycloakService.auth.authz = null;

    window.location.href = KeycloakService.auth.logoutUrl;
  }

   getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (KeycloakService.auth.authz.token) {
        KeycloakService.auth.authz.updateToken(5)
          .success(() => {
            resolve(<string>KeycloakService.auth.authz.token);
          })
          .error(() => {
            reject('Failed to refresh token');
          });
      }
    });
  }

  loadProfile(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (KeycloakService.auth.authz.token) {
        KeycloakService.auth.authz
          .loadUserProfile()
          .success(data => {
            resolve(<any>data);
          })
          .error(() => {
            reject('Failed to load profile');
          });
      } else {
        reject('Not loggen in');
      }
    })
  }

  getUserRoles(allRoles: boolean = true): string[] {
    let roles: string[] = [];

    // if (KeycloakService.auth.authz.resourceAccess) {
    //   for (const key in KeycloakService.auth.authz.resourceAccess) {
    //     if (KeycloakService.auth.authz.resourceAccess.hasOwnProperty(key)) {
    //       const resourceAccess: any = KeycloakService.auth.authz.resourceAccess[key];
    //       const clientRoles = resourceAccess['roles'] || [];
    //       roles = roles.concat(clientRoles);
    //     }
    //   }
    // }
    if (allRoles && KeycloakService.auth.authz.realmAccess) {
      let realmRoles = KeycloakService.auth.authz.realmAccess['roles'] || [];
      roles.push(...realmRoles);
    }
    return roles;
  }
}

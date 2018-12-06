import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {KeycloakService} from "./keycloakService";
import {HttpHeaders} from "@angular/common/http";
import {Observable} from 'rxjs';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private headers;
  private token;

  constructor(private keycloakService: KeycloakService) {

    this.keycloakService.getToken()
      .then(token => {
        this.headers = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        });
        this.token = token;
      })
      .catch(error => console.log(error));
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.token) {
      const cloned = request.clone({headers: this.headers});
      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }
}




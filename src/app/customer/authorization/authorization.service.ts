import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }

  public header(): HttpHeaders {
    let h = new HttpHeaders();
    h = h.set('Authorization', environment.services.customer.authorization);
    return h;
  }
}

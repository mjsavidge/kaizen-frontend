import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from './userlogin';

@Injectable({
  providedIn: 'root'
})
export class LoginDtoService {

  private loginURL = "http://localhost:8080/api/v1/signIn";

  constructor(private httpClient: HttpClient) { }

  logIn(userLogin: UserLogin): Observable<Object>{
    return this.httpClient.post(`${this.loginURL}`, userLogin )
  }

  
}

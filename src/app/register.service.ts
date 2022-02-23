import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private registerURL = "http://localhost:8080/api/v1/registration";

  constructor(private httpClient: HttpClient) { }

  createUser(user: User): Observable<Object> {
    return this.httpClient.post(`${this.registerURL}`, user);

  }
}

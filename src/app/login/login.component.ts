import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../userlogin';
import { LoginDtoService } from '../login-dto.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = new UserLogin();

  constructor(private router: Router, 
    private loginDtoService: LoginDtoService, 
    ) { }

  ngOnInit(): void {
  }

  signInUser(){
    this.loginDtoService.logIn(this.userLogin).subscribe(
    response => {
      console.log(response);
      
    },
    error => {
      console.log(error);
    }
    );
  }
  
  onSignIn(){
    this.signInUser();
    sessionStorage.setItem('name', this.userLogin.usernameOrEmail);
  }
}

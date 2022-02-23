import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User = new User();

  constructor(private router: Router, private registerService: RegisterService) { }

  ngOnInit(): void {
  }

  saveUser(){
    this.registerService.createUser(this.user).subscribe(data => {
      console.log(data);
      this.gotToHome();
    }, error => console.log(error));
  }

  gotToHome(){
    this.router.navigate(['http://localhost/4200'])
  }

  onSubmit(){
    this.saveUser();
  }

}
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service'


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {


  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}

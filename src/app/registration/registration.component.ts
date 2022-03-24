import { Component, OnInit,  } from '@angular/core';
import { AuthService } from '../shared/services/auth.service'



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {

  file: null;
  url: any;

  constructor(public authService: AuthService){ }

  ngOnInit(): void {
  }

  

  onFileSelected(event){
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }

  
  

}

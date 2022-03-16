import { Component, OnInit,  } from '@angular/core';
import { AuthService } from '../shared/services/auth.service'




@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {

  url:any;
  msg="";

  constructor(public authService: AuthService){ }

  ngOnInit(): void {
  }

  onClick() {
    this.selectFile;
  }

  selectFile(event: any){
    if(!event.target.files[0] || event.target.files[0].length ==0){
      this.msg = "You must select an image."
      return;
    }
    var mimetype = event.target.files[0].type;
    if (mimetype.match(/image\/*/) == null){
      this.msg="Only images are supported.";
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) =>{
      this.msg="";
      this.url = reader.result;
    }
  }
  

}

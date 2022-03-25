import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../shared/services/auth.service'
import { AngularFireStorage } from '@angular/fire/compat/storage';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  file: null;
  profileUrl: any;
 

  constructor(private breakpointObserver: BreakpointObserver,public authService: AuthService, public storage: AngularFireStorage) {}

  uploadVideo(event, uploader: string,  title: string, description: string, uploadTime:string){
    const user = this.authService.userData;
    const file = event.target.files[0];
    this.storage.upload('user/' + user.uid + '/videos/' + title, file, {customMetadata:{ uploader: uploader, title: title, description: description, time: uploadTime}});
  }

  download(){
    const user = this.authService.userData;
    const ref = this.storage.ref('user/' + user.uid + '/profile.png');
    return this.profileUrl = ref.getDownloadURL;
  }
 
}

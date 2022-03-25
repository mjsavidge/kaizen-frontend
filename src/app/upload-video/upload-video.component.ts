import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { AuthService } from '../shared/services/auth.service'

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent {

  file: null;

  profileUrl: any;  
  

  constructor(public storage: AngularFireStorage, public authService: AuthService) { }

  uploadVideo(event, uploader: string,  title: string, description: string, uploadTime:string){
    const file = event.target.files[0];
    this.storage.upload('user/' + JSON.parse(localStorage.getItem('user')!.split(',')[0]) + '/videos/' + title, file, {customMetadata:{ uploader: uploader, title: title, description: description, time: uploadTime}});
  }

  download(){
    const ref = this.storage.ref('user/' + JSON.parse(localStorage.getItem('user')!.split(',')[0]) + '/profile.png');
    return this.profileUrl = ref.getDownloadURL;
  }

}

import { Component, OnInit } from '@angular/core';
import { Video } from '../shared/services/video';
import { AngularFireStorage } from '@angular/fire/compat/storage'

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent implements OnInit {

  file: null;
  uid = JSON.parse(localStorage.getItem('user')!.split(',')[0]);  
  

  constructor(public storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  uploadVideo(event, uploader: string,  title: string, description: string, uploadTime:string){
    const file = event.target.files[0];
    this.storage.upload('user/' + this.uid + '/videos/' + title, file, {customMetadata:{ uploader: uploader, title: title, description: description, time: uploadTime}});
  }

}

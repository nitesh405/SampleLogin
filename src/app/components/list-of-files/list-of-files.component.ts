import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-list-of-files',
  templateUrl: './list-of-files.component.html',
  styleUrls: ['./list-of-files.component.css']
})
export class ListOfFilesComponent implements OnInit {
  usr: any = [];
  constructor(
    private uploadService : FileUploadService
  ) { }

  ngOnInit(): void {

    this.getFiles();
  }

  getFiles(){
    let email:any=localStorage.getItem('email');
    this.uploadService.getFiles(email).then(res => {
      this.usr=res.docs.map(e=> e.data())
    })
  }
}

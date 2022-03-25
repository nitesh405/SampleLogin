import { Component, OnInit } from '@angular/core';
import { AngularFireAuthService } from 'src/app/services/angular-fire-auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-list-of-files',
  templateUrl: './list-of-files.component.html',
  styleUrls: ['./list-of-files.component.css']
})
export class ListOfFilesComponent implements OnInit {
  usr: any = [];
  constructor(
    private uploadService : FileUploadService,private authAuthServ:AngularFireAuthService
  ) { }

  ngOnInit(): void {

    this.getFiles();
  }

  getFiles(){
    let email:any=this.authAuthServ.currentUser;
    this.uploadService.getFiles(email).subscribe(res=>{
      this.usr=res;
    })
  }

  delete(item:any){
    this.uploadService.deleteFile(item.id).then(res=>{
    })
  }
}

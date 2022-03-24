import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private basePath = '/uploads';
  constructor(
    private db : AngularFireDatabaseModule,
    private storage : AngularFireStorage,
    private afs : AngularFirestore
  ) { }

  pushFileToStorage( file :any) : Observable <any>{
    const filePath = `${this.basePath}/${file?.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);
    uploadTask.snapshotChanges().pipe(
      finalize (() =>{
        storageRef.getDownloadURL().subscribe(downloadUrl => {
          file.url = downloadUrl;
          this.saveFileData(file);
        })
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }

  async saveFileData(fileUpload :any){
   
    const file = {
      url : fileUpload.url,
      name : fileUpload.name,
      type : fileUpload.type,
      email:localStorage.getItem('email')
    }

    return await this.afs.collection('docs').add(file)
  }

 async getFiles(email:string){
   return await this.afs.collection('docs',ref=> ref.where('email','==',email)).get().toPromise();
  }

}


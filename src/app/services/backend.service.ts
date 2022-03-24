import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private afs: AngularFirestore) { }

  getList() {

  }

  async addItem(payload : any) {
   return await this.afs.collection('items').add(payload)
  }
}

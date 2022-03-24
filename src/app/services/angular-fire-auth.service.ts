import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AngularFireAuthService {

  constructor(private aungularFireAuth: AngularFireAuth) { }

  async signIn(email: string, password: string) {
    return await this.aungularFireAuth.signInWithEmailAndPassword(email, password)
  }

  async signUp(email: string, password: string) {
    return await this.aungularFireAuth.createUserWithEmailAndPassword(email, password)
  }

  async signOut() {
    return await this.aungularFireAuth.signOut();
  }
}

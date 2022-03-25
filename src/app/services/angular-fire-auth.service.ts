import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
@Injectable({
  providedIn: 'root'
})
export class AngularFireAuthService {
  public currentUser:any = ''

  constructor(private aungularFireAuth: AngularFireAuth) {
    this.aungularFireAuth.authState.subscribe(res => {
      this.currentUser=res?.email;
    })
  }

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

import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { 
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    public router: Router,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public ngZone: NgZone
  ) { 
    this.afAuth.authState.subscribe((user) => {
      if(user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      }else{
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  // sign in with email/password
  SignIn(email: string, password: string){
    return this.afAuth
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
      });
      this.SetUserData(result.user);
    })
    .catch((error) => {
      window.alert(error.message);
    });
  }

  // sign up with email and Password
  SignUp(email: string, password: string, username: string, profilePic: string){
    return this.afAuth
    .createUserWithEmailAndPassword(email, password)
    .then((result) =>{
      /* Call the SendVerificaitonMail() function when new user sign 
      up and returns promise */
      result.user?.updateProfile({
        displayName: username,
        photoURL: profilePic
      })
      this.SendVerificationMail();
      this.SetUserData(result.user);
    })
    .catch((error) => {
      window.alert(error.message);
    });

  }

  SendVerificationMail(){
    return this.afAuth.currentUser.then((user: any) => user.sendEmailVerification()).then(() => {
      this.router.navigate(['verify-email']);
    });
  }

  async ForgotPassword(passwordResetEmail: string){
    try {
      await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
      window.alert('Password Reset Email Sent, Check Your Indox.');
    } catch (error) {
      window.alert(error);
    }
  }

  get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user')!);
      return user !== null && user.emailVerified !== false ? true : false;
  }

  SetUserData(user: any){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `user/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  SignOut(){
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }
}

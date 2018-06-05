import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  constructor(private router: Router) {}

  signinUser(email: string, password: string) {
    // firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then(
    //     response => {
    //       this.router.navigate(['/']);
    //       firebase.auth().currentUser.getToken()
    //         .then(
    //           (token: string) => this.token = token
    //         )
    //     }
    //   )
    //   .catch(
    //     error => console.log(error)
    //   );
  }

  logout() {
    // firebase.auth().signOut();
    // this.token = null;
    console.log('logout');
  }

  getToken() {
    // firebase.auth().currentUser.getToken()
    //   .then(
    //     (token: string) => this.token = token
    //   );
    // return this.token;
    console.log('getToken');
  }

  isAuthenticated() {
    return this.token != null;
  }
}

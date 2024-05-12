// auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router'; // Import Angular Router
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(false); // Observable for login status

  constructor(private auth: AngularFireAuth, private router: Router) {
    // Initialize login status from local storage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.isLoggedIn$.next(isLoggedIn);
  }

  // Method to sign in user
  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.updateLoginStatus(true);
        this.router.navigateByUrl('/'); // Navigate to protected route after successful login
      });
  }

  // Method to sign out user
  signOut() {
    return this.auth.signOut()
      .then(() => {
        this.updateLoginStatus(false);
      });
  }

  // Method to sign up user
  signUp(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.updateLoginStatus(true);
        this.router.navigateByUrl('/'); // Navigate to protected route after successful sign-up
      });
  }

  // Method to update login status and save it to local storage
  private updateLoginStatus(isLoggedIn: boolean) {
    this.isLoggedIn$.next(isLoggedIn);
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }
}

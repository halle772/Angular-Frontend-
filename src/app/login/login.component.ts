import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signIn() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.auth.signIn(email, password)
      .then(() => {
        console.log('User signed in successfully!');
        // Redirect or show success message
      })
      .catch(error => {
        console.error('Error signing in:', error);
        // Handle error
      });
  }

}

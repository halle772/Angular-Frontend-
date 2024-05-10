import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signup(): void {
    const username = this.signupForm.get('username')?.value;
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

    if (username && email && password) { 
      this.authService.signup(username, email, password).subscribe((response) => {
        if (response.success) {
          this.router.navigateByUrl('/login');
        } else {
          console.log('Signup failed:', response.message);
        }
      });
    }
  }
}

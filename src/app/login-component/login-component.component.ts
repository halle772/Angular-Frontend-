import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
  
    if (username && password) {
      this.authService.login(username, password).subscribe((response) => {
        if (response.success) {
          this.router.navigateByUrl('/employee');
        } else {
          console.log('username/password is incorrect');
        }
      });
    } else {
      console.log('Both fields are required');
    }
  }

  goToSignup(): void {
    this.router.navigateByUrl('/signup');
  }
}

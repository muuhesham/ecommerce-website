import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (res: any) => {
        console.log('Login Successful', res);
        this.authService.saveToken(res.token);
        const tokenPayload = this.authService.decodeToken(res.token);
        localStorage.setItem('userId', tokenPayload.userId);
        if (tokenPayload.isAdmin) {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['']);
        }
      },
      error: (err) => {
        console.error(err);
        alert('Login Failed');
      },
    });
  }
}

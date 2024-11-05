import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouteshowComponent } from '../../components/routeshow/routeshow.component';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from '../../service/localstorage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, RouteshowComponent, RouterLink],
})
export class LoginComponent implements OnInit {
  currentItem = 'Login';
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService // Inject the LocalStorageService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      response => {
        // console.log('User logged in successfully!', response);
        
        // Use LocalStorageService to store user data
        this.localStorageService.setItem('pushpakuserdata', JSON.stringify(response));
        
        // Navigate to home page after login
        this.router.navigate(['/']);
      },
      error => {
        alert('Invalid credentials, please try again.');
        console.error('Login error', error);
      }
    );
  }
}

import { catchError, tap, of, finalize } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';


interface LoginResponse {
  token: string
}

@Component({
  selector: 'app-login',
  imports: [ FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = ''
  password = ''

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  onSubmit() {
    this.apiService.login(this.username, this.password)
      .pipe(
        tap((res: LoginResponse) => {
          try {
            console.log(res.token)
            localStorage.setItem('token', res.token)
            localStorage.setItem('username', this.username)
          } catch (error) {
            console.error('Error storing token in localStorage', error)
            throw error
          }
        }),
        catchError(err => {
          console.error('Login failed')
          return of(err)
        }),
        finalize(() => {
          if (localStorage.getItem('token')) {
            this.router.navigate(['/tasks'])
          } else {
            console.error('Token not found, redirect failed')
          }
        })
      ).subscribe()
  }

}

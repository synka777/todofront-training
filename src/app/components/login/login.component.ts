import { FormsModule } from '@angular/forms';
import { catchError, tap, of } from 'rxjs';
import { Component } from '@angular/core';

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

  constructor(private apiService: ApiService) {}

  onSubmit() {
    this.apiService.login(this.username, this.password)
      .pipe(
        tap((res: LoginResponse) => console.log('Token:', res.token)),
        catchError(err => {
          console.error('Login failed')
          return of(err)
        })
      ).subscribe()
  }

}

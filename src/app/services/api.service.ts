import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface LoginResponse {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getTasks(token: string) {
    const headers = { Authorization: `Token ${token}`}
    return this.http.get('/tasks/', { headers })
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/login/', { username, password })
  }
}

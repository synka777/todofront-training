import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Task } from '../models/task.model';


interface LoginResponse {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = 'http://localhost:8000'

  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = localStorage.getItem('token')
    console.log('Retrieved token from storage:', token)
    return {
      headers: new HttpHeaders({
        authorization: `Token ${token}`
      })
    }
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks/create/`, task ,this.getHeaders())
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks/`, this.getHeaders())
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/tasks/update/${task.id}`, task, this.getHeaders())
  }

  deleteTask(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/tasks/delete/${id}`, this.getHeaders())
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login/`, { username, password })
  }
}

import { tap, catchError, of } from 'rxjs';
import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import { ApiService } from '../../services/api.service';
import { Task } from '../../models/task.model';


@Component({
  selector: 'app-task-list',
  imports: [ NgFor ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  tasks: Task[] = []

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getTasks().pipe(
      tap((tasks) => {
        console.log('Tasks:',tasks)
        this.tasks = tasks
      }),
      catchError((err) => {
        console.error('Failed to get tasks', err)
        return of(err)
      }),
    ).subscribe()
  }

  deleteTask(id: number) {
    this.apiService.deleteTask(id).pipe(
      tap(() => {
        this.tasks = this.tasks.filter((task) => task.id !== id)
      }),
      catchError((err) => {
        console.error('Failed to delete task', err)
        return of(err)
      })
    ).subscribe()
  }
}

import { tap, catchError, of, EMPTY } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { Task } from '../../models/task.model';


@Component({
  selector: 'app-task-list',
  imports: [ NgIf, NgFor, FormsModule ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  tasks: Task[] = []
  newTaskTitle: string = ''
  username = localStorage.getItem('username')

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.apiService.getTasks().pipe(
      tap((tasks) => {
        console.log('Tasks:',tasks)
        this.tasks = tasks
      }),
      catchError((err) => {
        console.error('Failed to get tasks', err)
        // Return an observable to satisfy the type requirement
        // Only use this if you need to use hthe err into another Observable
        // Else, just use EMPTY
        return of(err)
      }),
    ).subscribe()
  }

  addTask() {
    if (!this.newTaskTitle.trim()) return // Check if there actually is a value

    const newTask: Task = {
      title: this.newTaskTitle.trim(),
      completed: false
    }

    this.apiService.addTask(newTask).pipe(
      tap((createdTask) => {
          this.tasks.push(createdTask)
          this.newTaskTitle = ''
      }),
      catchError((err) => {
        console.error(err)
        return EMPTY
      })
    ).subscribe()
  }


// Calling this function on a task with (click) creates an active link with said task
  toggleTask(task: Task) {
    // Take the task and just update the completed field
    const updatedTask = {...task, completed: !task.completed}

    this.apiService.updateTask(updatedTask).pipe(
      tap(() => task.completed = updatedTask.completed),
      catchError((err) => {
        console.error('Failed to update task', err)
        return EMPTY
      })
    ).subscribe()
  }


  deleteTask(id: number) {
    this.apiService.deleteTask(id).pipe(
      tap(() => this.tasks = this.tasks.filter((task) => task.id !== id)),
      catchError((err) => {
        console.error('Failed to delete task', err)
        return EMPTY
      })
    ).subscribe()
  }

  logout() {
    this.apiService.logout() // <= Just removeItem() the token from storage
    this.router.navigate(['/login'])
  }
}

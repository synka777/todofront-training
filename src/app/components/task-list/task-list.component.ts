import { FormsModule } from '@angular/forms';
import { tap, catchError, of } from 'rxjs';
import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import { ApiService } from '../../services/api.service';
import { Task } from '../../models/task.model';


@Component({
  selector: 'app-task-list',
  imports: [ NgFor, FormsModule ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  tasks: Task[] = []
  newTaskTitle: string = ''

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

  addTask() {
    if (!this.newTaskTitle.trim()) return

    const newTask: Task = {
      title: this.newTaskTitle.trim(),
      completed: false
    }

    this.apiService.addTask(newTask).pipe(
      tap((createdTask) => {
        try {
          this.tasks.push(createdTask)
          this.newTaskTitle = ''
        } catch (error) {
          throw error
        }
      }),
      catchError((err) => {
        console.error(err)
        return of(err) // Return an observable to satisfy the type requirement
      })
    ).subscribe()
  }


  toggleTask(task: Task) {
    const updatedTask = {...task, completed: !task.completed}

    this.apiService.updateTask(updatedTask).pipe(
      tap(() => {
        try {
          task.completed = updatedTask.completed
        } catch (error) {
          throw error
        }
      }),
      catchError((err) => {
        console.error('Failed to update task', err)
        return of(err)
      })
    ).subscribe()
  }


  deleteTask(id: number) {
    this.apiService.deleteTask(id).pipe(
      tap(() => {
        try {
          this.tasks = this.tasks.filter((task) => task.id !== id)
        } catch (error) {
          throw error
        }
      }),
      catchError((err) => {
        console.error('Failed to delete task', err)
        return of(err)
      })
    ).subscribe()
  }
}

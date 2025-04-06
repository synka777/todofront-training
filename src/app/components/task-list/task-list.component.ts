import { Component } from '@angular/core';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-task-list',
  imports: [ NgFor ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  tasks = ['Exercise', 'Eat', 'Code', 'Meditate', 'Sleep']
}

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Task } from '../../models/task.model';


@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  // "!" => Used to assign a value later: Input receives its value from parent component
  // Alternative to using "?" or defining a default value
  @Input() task!: Task // Receiving task as input
  @Output() toggle = new EventEmitter<Task>() // Emitting toggle event
  @Output() delete = new EventEmitter<number>() // Emitting delete event

  onToggle() {
    this.toggle.emit(this.task) // Emit the task for toggling
  }

  onDelete() {
    this.delete.emit(this.task.id) // Emit the task id for deletion
  }
}

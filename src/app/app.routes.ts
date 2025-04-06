import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: 'tasks', component: TaskListComponent },
    { path: 'login', component: LoginComponent }
];

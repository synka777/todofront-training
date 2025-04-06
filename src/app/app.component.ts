import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  standalone: true,  // Marks this component as standalone
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todofront';
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule
  ],            
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}

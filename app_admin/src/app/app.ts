import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TripListingComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title ='Travlr Getaways Admin';
}

import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-routeshow',
  standalone: true,
  imports: [],
  templateUrl: './routeshow.component.html',
  styleUrl: './routeshow.component.css'
})
export class RouteshowComponent  {
  @Input() item = '';
}

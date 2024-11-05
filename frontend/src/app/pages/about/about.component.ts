import { Component} from '@angular/core';
import { RouteshowComponent } from "../../components/routeshow/routeshow.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarousalComponent } from '../../components/carousal/carousal.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouteshowComponent,CommonModule,RouterLink,CarousalComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  currentItem = 'About';

  teamMembers = [  
    {  
      name: "Amanda Bates",  
      role: "Designer",  
      social: {  
        facebook: "#",  
        twitter: "#",  
        pinterest: "#",  
        instagram: "#"  
      }  ,
      image: "assets/images/users/avatar-1.jpg" // Replace with actual image path  
    },  
    {  
      name: "Silvia Dizoza",  
      role: "Sales Representative",  
      social: {  
        facebook: "#",  
        twitter: "#",  
        pinterest: "#",  
        instagram: "#"  
      }  ,

      image: "assets/images/users/avatar-3.jpg" // Replace with actual image path  
    },  
    {  
      name: "Jamie McAlice",  
      role: "HR Department",  
      social: {  
        facebook: "#",  
        twitter: "#",  
        pinterest: "#",  
        instagram: "#"  
      }  ,
      image: "assets/images/users/avatar-6.jpg" // Replace with actual image path  
    }  
  ];  

}

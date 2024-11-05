import { Component } from '@angular/core';
import {RouteshowComponent}  from "../../components/routeshow/routeshow.component"
import { HerosectionComponent } from '../../components/herosection/herosection.component';
import { CardssectionComponent } from '../../components/cardssection/cardssection.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouteshowComponent,CommonModule,HerosectionComponent,CardssectionComponent ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  currentItem = 'About Us';
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

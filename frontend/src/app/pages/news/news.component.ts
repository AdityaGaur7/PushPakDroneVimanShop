import { Component } from '@angular/core';
import {RouteshowComponent}  from "../../components/routeshow/routeshow.component"
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [RouteshowComponent,CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  currentItem = 'News';
  newsArticles = [   
    {  
      "title": "Essential product for women",  
      "author": "Ram M",  
      "date": "December 24, 2021",  
      "comments": 2,  
      "categories": ["HandCrafts", "Leather"],  
      "description": "Ratues cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa...",  
      "image": "assets/images/news/newimg1.webp"  
    },  
    {  
      "title": "Trendy range of handbags",  
      "author": "Ram M",  
      "date": "December 24, 2021",  
      "comments": 1,  
      "categories": ["Leather", "Stylish"],  
      "description": "Watues cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa...",  
      "image": "assets/images/news/newimg2.webp"  
    },  
    {  
      "title": "Latest branded bags for women",  
      "author": "Ram M",  
      "date": "December 24, 2021",  
      "comments": 2,  
      "categories": ["Leather", "Stylish"],  
      "description": "Catues cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa...",  
      "image": "assets/images/news/newimg3.webp"  
    },  
    {  
      "title": "Variety of women handbags",  
      "author": "Ram M",  
      "date": "December 24, 2021",  
      "comments": 1,  
      "categories": ["Leather", "Stylish"],  
      "description": "Patues cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa...",  
      "image": "assets/images/news/newimg4.webp"  
    },  
    {  
      "title": "Leather handbags latest design",  
      "author": "Ram M",  
      "date": "December 24, 2021",  
      "comments": 1,  
      "categories": ["HandCrafts", "Leather"],  
      "description": "Satues cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa...",  
      "image": "assets/images/news/newimg5.webp"  
    },  
    {  
      "title": "Ethnic embroidered handbags",  
      "author": "Ram M",  
      "date": "December 24, 2021",  
      "comments": 1,  
      "categories": ["HandCrafts", "Leather"],  
      "description": "Aatues cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa...",  
      "image": "assets/images/news/newimg6.webp"  
    }  
  ];

  recentArticles = [  
    {  
      title: "Essential product for women",  
      author: "Ram M",  
      date: "December 24, 2021",  
      comments: 2,  
      categories: ["HandCrafts", "Leather"],  
      description: "Ratues cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa...",  
      image: "assets/images/home/homeimg1.webp"  
    },  
    {  
      title: "Trendy range of handbags",  
      author: "Ram M",  
      date: "December 24, 2021",  
      comments: 1,  
      categories: ["Leather", "Stylish"],  
      description: "Watues cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa...",  
      image: "assets/images/home/homeimg2.webp"  
    },  
    {  
      title: "Latest branded bags for women",  
      author: "Ram M",  
      date: "December 24, 2021",  
      comments: 2,  
      categories: ["Leather", "Stylish"],  
      description: "Catues cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa...",  
      image: "assets/images/home/homeimg3.webp"  
    }  
  ];  
}

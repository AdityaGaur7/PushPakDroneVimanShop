import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-carousal',
  standalone: true,
  imports: [NgbCarouselModule,CommonModule],
  templateUrl: './carousal.component.html',
  styleUrl: './carousal.component.css'
})
export class CarousalComponent {
  images = ["../../../assets/images/hero image.40b3fbbb9d784511fe71.avif","../../../assets/images/hero image.40b3fbbb9d784511fe71.avif","../../../assets/images/hero image.40b3fbbb9d784511fe71.avif"
    ].map((n) => `${n}`);

    imagess = [
      { url: '../../../assets/images/hero image.40b3fbbb9d784511fe71.avif', altText: 'First slide' },
      { url: '../../../assets/images/drone-flying.jpg', altText: 'First slide' },
      { url: '../../../assets/images/tools.jpg', altText: 'First slide' },
    
    ];
}

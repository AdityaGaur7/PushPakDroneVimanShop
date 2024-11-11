import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../service/product.service'; // Adjust the path as necessary
import { Product } from '../../model/product';
import { CommonModule } from '@angular/common';
import { log } from 'console';

@Component({
  selector: 'app-cardssection',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './cardssection.component.html',
  styleUrl: './cardssection.component.css'
})
export class CardssectionComponent {
  topSoldProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  // ngOnInit(): void {
  //   this.fetchTopSoldProducts();
  // }

  // fetchTopSoldProducts(): void {
  //   this.productService.getTop4SoldProducts().subscribe((products: Product[]) => {
  //     this.topSoldProducts = products.slice(0, 4);
  //     // console.log(this.topSoldProducts);
      
  //   });
  // }
}

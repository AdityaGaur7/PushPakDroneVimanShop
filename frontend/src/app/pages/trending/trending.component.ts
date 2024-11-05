import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css'
})
export class TrendingComponent implements OnInit{
  topSoldProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchTopSoldProducts();
  }

  fetchTopSoldProducts(): void {
    this.productService.getTop4SoldProducts().subscribe((products: Product[]) => {
      this.topSoldProducts = products.slice(0, 16);
      console.log(this.topSoldProducts);
      
    });
  }
}

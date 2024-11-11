import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-section.component.html',
  styleUrl: './product-section.component.css'
})
export class ProductSectionComponent {
  products :any= [
    {
      name: 'Walnut Leather Bag',
      price: 400.00,
      brand: 'ELENA',
      image: 'assets/images/bags/bag1.webp'
    },
    {
      name: 'Golden Buckle Handbag',
      price: 406.00,
      brand: 'VEELA',
      image: 'assets/images/bags/bag2.webp'
    },
    {
      name: 'Krimson Hand Bag',
      price: 438.00,
      brand: 'EPHANY',
      image: 'assets/images/bags/bag3.webp'
    },
    {
      name: 'Ryan Phil Hand Bag',
      price: 314.00,
      brand: 'EPHANY',
      image: 'assets/images/bags/bag4.webp'
    },
    {
      name: 'Jeanica Lenner Bag',
      price: 414.00,
      brand: 'ELENA',
      image: 'assets/images/bags/bag5.webp'
    },
    {
      "name": "Leather Delight Handbag",
      "price": 706.00,
      "brand": "VEELO",
      "image": "assets/images/bags/bag6.webp"
    },
    {
      "name": "Crimson Hand Bag",
      "price": 106.00,
      "brand": "ELENA",
      "image": "assets/images/bags/bag2.webp"
    },
    {
      "name": "Crysta Leather Bag",
      "price": 106.00,
      "brand": "EPHIANY",
      "image": "assets/images/bags/bag3.webp"
    }
  ];

  trendingProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  // ngOnInit(): void {
  //   this.fetchTrendingProducts();
  // }

  // fetchTrendingProducts(): void {
  //   this.productService.getTop4SoldProducts().subscribe((products: Product[]) => {
  //     this.trendingProducts = products.slice(4, 12);
  //   });
  // }
  
}

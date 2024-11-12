import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
  keyword: string = '';
  products: Product[] = [];
  sortedProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.keyword = params['id'];
      this.search();
    });
  }

  search(): void {
    if (this.keyword) {
      this.productService.searchProducts(this.keyword).subscribe(
        (data: Product[]) => {
          this.products = data;
          console.log('Products:', this.products);
          
          this.sortedProducts = [...this.products];  // Initialize with unsorted products
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    }
  }

  // Handle sorting
  onSortChange(event: any): void {
    const sortBy = event.target.value;

    switch (sortBy) {
      case 'price_asc':
        this.sortedProducts = this.products.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        this.sortedProducts = this.products.sort((a, b) => b.price - a.price);
        break;
      case 'name_asc':
        this.sortedProducts = this.products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        this.sortedProducts = this.products.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        this.sortedProducts = [...this.products]; // Default to unsorted
        break;
    }
  }
}

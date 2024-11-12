import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-searchall',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './searchall.component.html',
  styleUrls: ['./searchall.component.css'], // Fixed styleUrls typo
})
export class SearchallComponent implements OnInit {
  searchForm: FormGroup;
  products: Product[] = [];

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.searchForm = this.fb.group({
      keyword: [''],
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  search(): void {
    const keyword = this.searchForm.get('keyword')?.value; // Access keyword from the form
    if (keyword) {
      this.productService.searchProducts(keyword).subscribe(
        (data: Product[]) => {
          this.products = data;
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    } else {
      this.getAllProducts();
    }
  }
  getAllProducts(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        // console.log(this.products);
        
      },
      (error) => {
        console.error('Error fetching all products:', error);
      }
    );
  }
}

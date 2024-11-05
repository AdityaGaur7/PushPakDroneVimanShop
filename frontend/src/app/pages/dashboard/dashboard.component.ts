import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase-config'; // Adjust the path to your Firebase configuration

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  formVisible: boolean = false;
  products: Product[] = [];
  selectedImages: File[] = []; // Change to array
  sortColumn: string = ''; // Column to sort by
  sortDirection: string = 'asc'; // 'asc' for ascending, 'desc' for descending

  productForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    stock: new FormControl('', [Validators.required, Validators.min(0)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    category: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required),
    sold: new FormControl(0)
  });

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  toggleForm(): void {
    this.formVisible = !this.formVisible;
  }

  // Sort Products by the selected column
  sortProducts(column: string): void {
    this.sortDirection = this.sortColumn === column && this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortColumn = column;

    this.products.sort((a: any, b: any) => {
      const valueA = a[column];
      const valueB = b[column];

      return this.sortDirection === 'asc' ? (valueA < valueB ? -1 : 1) : (valueA > valueB ? -1 : 1);
    });
  }

  // Get the icon class based on sort column and direction
  getSortIcon(column: string): string {
    return this.sortColumn === column ? (this.sortDirection === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down') : 'fas fa-sort';
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.sortProducts(this.sortColumn); // Sort after fetching products
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.getProducts(); // Refresh the product list after deletion
      });
    }
  }

  editProduct(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  handleImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedImages = Array.from(input.files).slice(0, 4); // Limit to 4 images

      // Preview selected images
      const previewContainer = document.createElement('div');
      this.selectedImages.forEach((image) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.createElement('img');
          img.src = e.target?.result as string; // Use optional chaining correctly here
          img.width = 80; // Preview size
          img.height = 80;
          previewContainer.appendChild(img);
        };
        reader.readAsDataURL(image);
      });

      // Append the preview container to the form
      const previewDiv = document.querySelector('.preview-container');
      if (previewDiv) {
        previewDiv.innerHTML = ''; // Clear previous previews
        previewDiv.appendChild(previewContainer);
      }
    }
  }

  async addProduct(): Promise<void> {
    if (this.productForm.invalid) {
      return; // Exit if the form is invalid
    }
  
    const imagesUrl: string[] = [];
  
    // Upload images to Firebase and get URLs
    for (const image of this.selectedImages) {
      const imageRef = ref(storage, `products/${image.name}`);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      imagesUrl.push(url);
    }
  
    // Ensure the id is assigned a default value if undefined
    const newProduct: Product = {
      id: this.productForm.value.id || 0, // Default value for id
      name: this.productForm.value.name || '', // Default value for name
      description: this.productForm.value.description || '', // Default value for description
      stock: this.productForm.value.stock ? (this.productForm.value.stock) : '', // Ensure stock is a number
      price: this.productForm.value.price || 0, // Default value for price
      category: this.productForm.value.category || '', // Default value for category
      link: this.productForm.value.link || '', // Default value for link
      sold: this.productForm.value.sold || 0, // Default value for sold
      images: imagesUrl,
    };
  
    this.productService.addProduct(newProduct).subscribe(() => {
    
      
      this.productForm.reset();
      this.selectedImages = []; // Clear selected images
      this.getProducts(); // Refresh product list
    });
  }
  
  truncateDescription(description: string): string {
    if (description.length <= 20) {
      return description;
    }
    return description.substring(0, 20) + '...';
  }

  expandedProductId: number | null = null; // Keep track of the expanded product ID

  // ... existing methods

  // Toggle description display for the product
  toggleDescription(productId: number): void {
    this.expandedProductId = this.expandedProductId === productId ? null : productId;
  }

  // Method to check if the description should be expanded
  isDescriptionExpanded(productId: number): boolean {
    return this.expandedProductId === productId;
  }

}

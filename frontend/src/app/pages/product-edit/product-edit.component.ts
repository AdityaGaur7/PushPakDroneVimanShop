import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase-config'; // Adjust the path to your Firebase configuration

@Component({
  selector: 'app-product-edit',
  standalone: true,
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  imports: [ReactiveFormsModule]
})
export class ProductEditComponent implements OnInit {
  productForm!: FormGroup;
  productId!: string;
  selectedImages: File[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.initializeForm();
    this.getProduct();
  }

  initializeForm(): void {
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      stock: [''],
      price: [''],
      category: [''],
      images: [''],  // Changed from image to images
      link: [''],
      sold:['']
    });
  }

  getProduct(): void {
    this.productService.getProduct(this.productId).subscribe((product: Product) => {
      this.productForm.patchValue(product);
    });
  }

  handleImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedImages = Array.from(input.files);
    }
  }

  async updateProduct(): Promise<void> {
    if (this.productForm.valid) {
        let imageUrls: string[] = [];

        // Upload all selected images
        if (this.selectedImages.length > 0) {
            const uploadPromises = this.selectedImages.map(async (image) => {
                const imageRef = ref(storage, `images/${Date.now()}_${image.name}`);
                try {
                    await uploadBytes(imageRef, image);
                    return await getDownloadURL(imageRef);
                } catch (error) {
                    console.error("Image upload error:", error);
                    return null; // Handle error appropriately
                }
            });

            // Resolve all promises and filter out null values
            const resolvedUrls = await Promise.all(uploadPromises);
            imageUrls = resolvedUrls.filter((url): url is string => url !== null); // Type guard to filter out nulls
        }

        const updatedProduct: Product = {
            ...this.productForm.value,
            images: imageUrls // Use the updated image URLs if available
        };

        this.productService.updateProduct(this.productId, updatedProduct).subscribe((response) => {
            // console.log(response);
            this.router.navigate(['/dashboard']);
        });
    }
}

}

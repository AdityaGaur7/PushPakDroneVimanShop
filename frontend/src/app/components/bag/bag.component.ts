import { Component } from '@angular/core';
import { RouteshowComponent } from "../routeshow/routeshow.component";
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product';
import { CommonModule } from '@angular/common';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bag',
  standalone: true,
  imports: [RouteshowComponent, CommonModule, NgbCarouselModule],
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.css'],
  providers: [NgbCarouselConfig],
})
export class BagComponent implements OnInit {
  currentItem: any = "BAGS";
  product: any;
  productId!: string;
 images!: string[];
  showNavigationArrows = true;
  showNavigationIndicators = true;
 

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    config: NgbCarouselConfig
  ) {
    // Customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.getProduct();
 
    
  }

  getProduct(): void {
    if (this.productId) {
      this.productService.getProduct(this.productId).subscribe(
        (data: Product) => {
          this.product = data;
          this.images = data.images;
          // this.images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);
          // console.log(this.product.images);
        },
        (error) => {
          console.error('Error fetching product:', error);
        }
      );
    }
  }

  buyProduct(): void {
    if (this.product) {
      this.product.sold = (this.product.sold || 0) + 1;
      this.productService.updateSoldCount(this.product.id, this.product.sold).subscribe(
        (data: Product) => {
          this.product = data;
          console.log('Sold count updated:', data);
        },
        (error) => {
          console.error('Error updating sold count:', error);
        }
      );
    }
  }
}

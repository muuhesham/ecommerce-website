import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css'],
})
export class AddProductComponent {
  productData: any = {
    name: '',
    desc: '',
    price: '',
    img: null,
    category: '',
  };

  constructor(private productService: ProductService, private router: Router) {}

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.productData.img = file;
      console.log('File Selected:', file);
    }
  }

  onSubmit(): void {
    const formData = new FormData();

    formData.append('name', this.productData.name);
    formData.append('desc', this.productData.desc);
    formData.append('price', this.productData.price.toString());
    formData.append('category', this.productData.category);

    if (this.productData.img) {
      formData.append('img', this.productData.img);
    }

    console.log('FormData:', Array.from(formData.entries())); 

    this.productService.addProduct(formData).subscribe({
      next: (response) => {
        console.log('Product added successfully:', response);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error while adding product:', err);
      },
    });
  }
}

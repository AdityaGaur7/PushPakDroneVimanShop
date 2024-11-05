import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { storage } from '../../config/firebase-config';  // Import initialized Firebase Storage
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { CommonModule } from '@angular/common';
import { RouteshowComponent } from '../../components/routeshow/routeshow.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [
    ReactiveFormsModule,  // Import necessary modules for form handling
    CommonModule,         // Import CommonModule for Angular directives
    RouteshowComponent
  ],
})
export class SignupComponent implements OnInit {
  currentItem = 'Signup';
  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    cpassword: new FormControl('', [Validators.required]),
    address: new FormControl(''),
    image: new FormControl(''),
    isadmin: new FormControl(false)
  });
  selectedImage: File | null = null;
  imageUrl: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onImageSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      // Allowed image types
      const allowedTypes = ['image/jpeg', 'image/png'];
      // Maximum image size (200KB)
      const maxSize = 200 * 1024; // 200KB

      if (!allowedTypes.includes(file.type)) {
        alert('Only JPEG and PNG images are allowed.');
        this.selectedImage = null;
      } else if (file.size > maxSize) {
        alert('File size should be less than 200KB.');
        this.selectedImage = null;
      } else {
        this.selectedImage = file;
      }
    }
  }

  uploadImage(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.selectedImage) {
        const storageRef = ref(storage, `images/${Date.now()}_${this.selectedImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, this.selectedImage);

        uploadTask.on(
          'state_changed',
          snapshot => {
            // Optional: Track upload progress here
          },
          error => {
            console.error('Image upload error:', error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
              console.log('Image available at', downloadURL);
              this.imageUrl = downloadURL;
              resolve(downloadURL);
            });
          }
        );
      } else {
        reject('No image selected');
      }
    });
  }

  async onSubmit(): Promise<void> {
    if (this.signupForm.value.password !== this.signupForm.value.cpassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      // Upload the image and get the URL
      const imageUrl = await this.uploadImage();
      this.signupForm.patchValue({ image: imageUrl });

      // Submit form data to the server
      this.authService.signUp(this.signupForm.value).subscribe(
        response => {
          console.log('User signed up successfully!', response);
          localStorage.setItem('pushpakuserdata', JSON.stringify(response));
          this.router.navigate(['/']);
        },
        error => {
          alert('Invalid credentials, try again');
          console.error('Sign-up error', error);
        }
      );
    } catch (error) {
      console.error('Error in sign-up process', error);
    }
  }
}

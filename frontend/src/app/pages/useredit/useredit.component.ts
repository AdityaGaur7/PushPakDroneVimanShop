import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase-config';  // Import initialized Firebase Storage

@Component({
  selector: 'app-useredit',
  standalone: true,
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css'],
  imports:[ReactiveFormsModule]
})
export class UsereditComponent implements OnInit {
  userForm!: FormGroup;
  userId!: string;
  selectedImage: File | null = null;
  imageUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: AuthService, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.initializeForm();
    this.getUser();
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      username: [''],
      address: [''],
      image: ['']
    });
  }

  getUser(): void {
    this.userService.getUserById(this.userId).subscribe(
      user => {
        this.userForm.patchValue(user);
      },
      error => {
        console.error('Error fetching user:', error);
      }
    );
  }

  onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  uploadImage(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.selectedImage) {
        const storageRef = ref(storage, `profile_images/${Date.now()}_${this.selectedImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, this.selectedImage);

        uploadTask.on(
          'state_changed',
          snapshot => {
            // Optional: Track upload progress
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

  
  async updateUser(): Promise<void> {
    try {
      let imageUrl = this.userForm.value.image;
  
      // If an image is selected, upload it to Firebase and get the URL
      if (this.selectedImage) {
        imageUrl = await this.uploadImage();
      }
  
      // Update the form with the image URL
      this.userForm.patchValue({ image: imageUrl });
  
      // Send the updated data to the backend
      this.userService.updateUser(this.userId, this.userForm.value).subscribe(
        response => {
          console.log('User updated successfully', response);
  
          // Update localStorage with the new user data
       
          const existingData = JSON.parse(localStorage.getItem('pushpakuserdata') || '{}');

          // Merge existing data with the updated user data
          const updatedUserData = {
            token: existingData.token, // Keep the existing token
            user: {
              id: response.id || existingData.user.id, // Update id if available
              username: response.username || existingData.user.username, // Update username
              email: response.email || existingData.user.email, // Update email
              address: this.userForm.value.address || existingData.user.address, // Update address
              image: imageUrl || existingData.user.image, // Updated image URL
              isAdmin: existingData.user.isAdmin // Retain isAdmin status
            }
          };
  
          // Store the updated user data back in localStorage
          localStorage.setItem('pushpakuserdata', JSON.stringify(updatedUserData));
  
          // Navigate to the profile page after updating
          this.router.navigate(['/profile']);
        },
        (error) => {
          console.error('Error updating user', error);
        }
      );
    } catch (error) {
      console.error('Error in update process', error);
    }
  }
}
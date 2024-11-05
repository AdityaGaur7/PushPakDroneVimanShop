import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../service/localstorage.service'; 

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public data: any = null;
  public userData: any = null;


  constructor(private localStorageService: LocalStorageService) {   
    const data = this.localStorageService.getItem('pushpakuserdata');
    try {
      if (data) {
        try {
          this.userData = data;
          this.userData = this.userData.user;
          // console.log(this.userData);
          
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      } else {
        this.userData = null;
      }
    } catch (e) {
      console.error('Local storage is not accessible:', e);
      this.data = null;
    }
  }

  ngOnInit(): void {
    // Component initialization logic if needed
  }
}

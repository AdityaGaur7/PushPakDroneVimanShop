import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardssectionComponent } from "../../components/cardssection/cardssection.component";
import { LocalStorageService } from '../../service/localstorage.service'; // Import the service

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbModule, RouterLink, CommonModule, CardssectionComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isNavbarCollapsed: boolean = true;
  public loggedin: any = null;
  isadmin: boolean = false;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private localStorageService: LocalStorageService // Inject the service
  ) {
    this.loadUserData();
  }

  ngOnInit(): void {}

  // Method to load user data from local storage
  private loadUserData(): void {
    const data = this.localStorageService.getItem('pushpakuserdata');
    if (data) {
      try {
        this.loggedin = data;
        this.isadmin = this.loggedin.user?.isAdmin || false;
        this.loggedin = this.loggedin.user;
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    } else {
      this.loggedin = null;
    }
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
    const navbarCollapse = this.el.nativeElement.querySelector('#navbarNav');
    if (navbarCollapse) {
      if (this.isNavbarCollapsed) {
        this.renderer.removeClass(navbarCollapse, 'show');
      } else {
        this.renderer.addClass(navbarCollapse, 'show');
      }
    }
  }

  logout(): void {
    this.localStorageService.removeItem('pushpakuserdata');
    window.location.href = '/';
  }

  toggleDropdown(dropdownId: string): void {
    const dropdownMenu = this.el.nativeElement.querySelector(`#${dropdownId}Menu`);
    if (dropdownMenu) {
      const isShown = dropdownMenu.classList.contains('show');
      if (isShown) {
        this.renderer.removeClass(dropdownMenu, 'show');
      } else {
        this.renderer.addClass(dropdownMenu, 'show');
      }
    }
  }

  @HostListener('document:click', ['$event'])
  closeDropdowns(event: Event): void {
    if (!this.el.nativeElement.contains(event.target)) {
      const dropdowns = this.el.nativeElement.querySelectorAll('.dropdown-menu');
      dropdowns.forEach((menu: HTMLElement) => {
        if (menu.classList.contains('show')) {
          this.renderer.removeClass(menu, 'show');
        }
      });
    }
  }
}

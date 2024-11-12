import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { NavbarComponent } from "./MainComponent/navbar/navbar.component";
import { CarousalComponent } from "./components/carousal/carousal.component";
import { HomeComponent } from "./MainComponent/home/home.component";
import { FAQComponent } from "./pages/faq/faq.component";
import { FooterComponent } from "./MainComponent/footer/footer.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { TrendingComponent } from './pages/trending/trending.component';
// import {ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CarousalComponent, HomeComponent, FAQComponent, FooterComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title= 'frontend';

}
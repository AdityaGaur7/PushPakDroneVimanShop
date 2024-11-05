import { Component } from '@angular/core';
import { SupportComponent } from "../../components/support/support.component";
import { HerosectionComponent } from '../../components/herosection/herosection.component';
import { LinesectionComponent } from '../../components/linesection/linesection.component';
import { CardssectionComponent } from '../../components/cardssection/cardssection.component';
import { ProductSectionComponent } from '../../components/product-section/product-section.component';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '../../components/hero/hero.component';
import { CarousalComponent } from '../../components/carousal/carousal.component';
import { ThreesectionComponent } from '../../components/threesection/threesection.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ThreesectionComponent,SupportComponent,CarousalComponent,HerosectionComponent,HeroComponent,LinesectionComponent,CardssectionComponent,ProductSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

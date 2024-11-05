import { Component,OnInit } from '@angular/core';
import {RouteshowComponent}  from "../../components/routeshow/routeshow.component"
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RouteshowComponent,NgbAccordionModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FAQComponent {
  constructor(private route:ActivatedRoute){}
  currentItem = 'FAQs';
  ngOnInit(): void {

    let id = this.route.snapshot.paramMap;
    // console.log(id);
  }
}

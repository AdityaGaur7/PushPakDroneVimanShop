import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardssectionComponent } from './cardssection.component';

describe('CardssectionComponent', () => {
  let component: CardssectionComponent;
  let fixture: ComponentFixture<CardssectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardssectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardssectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

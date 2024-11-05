import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteshowComponent } from './routeshow.component';

describe('RouteshowComponent', () => {
  let component: RouteshowComponent;
  let fixture: ComponentFixture<RouteshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteshowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RouteshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

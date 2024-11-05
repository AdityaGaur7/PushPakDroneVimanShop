import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreesectionComponent } from './threesection.component';

describe('ThreesectionComponent', () => {
  let component: ThreesectionComponent;
  let fixture: ComponentFixture<ThreesectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreesectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThreesectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

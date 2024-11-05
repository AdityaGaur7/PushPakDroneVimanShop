import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinesectionComponent } from './linesection.component';

describe('LinesectionComponent', () => {
  let component: LinesectionComponent;
  let fixture: ComponentFixture<LinesectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinesectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinesectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

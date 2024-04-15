import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PEmployeeComponent } from './p-employee.component';

describe('PEmployeeComponent', () => {
  let component: PEmployeeComponent;
  let fixture: ComponentFixture<PEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

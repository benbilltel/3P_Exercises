import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDrawerComponent } from './question-drawer.component';

describe('QuestionDrawerComponent', () => {
  let component: QuestionDrawerComponent;
  let fixture: ComponentFixture<QuestionDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionDrawerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

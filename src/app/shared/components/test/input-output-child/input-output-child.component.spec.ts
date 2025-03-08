import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOutputChildComponent } from './input-output-child.component';

describe('InputOutputChildComponent', () => {
  let component: InputOutputChildComponent;
  let fixture: ComponentFixture<InputOutputChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputOutputChildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputOutputChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

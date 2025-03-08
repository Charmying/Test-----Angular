import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOutputParentComponent } from './input-output-parent.component';

describe('InputOutputParentComponent', () => {
  let component: InputOutputParentComponent;
  let fixture: ComponentFixture<InputOutputParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputOutputParentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputOutputParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

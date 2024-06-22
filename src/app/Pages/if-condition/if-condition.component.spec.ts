import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IfConditionComponent } from './if-condition.component';

describe('IfConditionComponent', () => {
  let component: IfConditionComponent;
  let fixture: ComponentFixture<IfConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IfConditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IfConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

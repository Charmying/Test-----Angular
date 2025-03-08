import { ComponentFixture, TestBed } from '@angular/core/testing';

import { dependency-injectionComponent } from './dependency-injection.component';

describe('dependency-injectionComponent', () => {
  let component: dependency-injectionComponent;
  let fixture: ComponentFixture<dependency-injectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [dependency-injectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(dependency-injectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

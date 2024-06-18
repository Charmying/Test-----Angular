import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginComponent } from './origin.component';

describe('OriginComponent', () => {
  let component: OriginComponent;
  let fixture: ComponentFixture<OriginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OriginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OriginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

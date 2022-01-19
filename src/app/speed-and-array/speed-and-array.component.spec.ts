import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedAndArrayComponent } from './speed-and-array.component';

describe('SpeedAndArrayComponent', () => {
  let component: SpeedAndArrayComponent;
  let fixture: ComponentFixture<SpeedAndArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeedAndArrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedAndArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesAssignComponent } from './devices-assign.component';

describe('DevicesAssignComponent', () => {
  let component: DevicesAssignComponent;
  let fixture: ComponentFixture<DevicesAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicesAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

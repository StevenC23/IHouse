import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesAggComponent } from './devices-agg.component';

describe('DevicesAggComponent', () => {
  let component: DevicesAggComponent;
  let fixture: ComponentFixture<DevicesAggComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicesAggComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesAggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

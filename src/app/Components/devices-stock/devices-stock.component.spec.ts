import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesStockComponent } from './devices-stock.component';

describe('DevicesStockComponent', () => {
  let component: DevicesStockComponent;
  let fixture: ComponentFixture<DevicesStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicesStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

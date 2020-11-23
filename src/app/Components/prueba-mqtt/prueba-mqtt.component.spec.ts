import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaMqttComponent } from './prueba-mqtt.component';

describe('PruebaMqttComponent', () => {
  let component: PruebaMqttComponent;
  let fixture: ComponentFixture<PruebaMqttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaMqttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaMqttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

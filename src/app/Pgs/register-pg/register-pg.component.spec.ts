import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPgComponent } from './register-pg.component';

describe('RegisterPgComponent', () => {
  let component: RegisterPgComponent;
  let fixture: ComponentFixture<RegisterPgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

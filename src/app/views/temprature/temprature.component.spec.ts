import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempratureComponent } from './temprature.component';

describe('TempratureComponent', () => {
  let component: TempratureComponent;
  let fixture: ComponentFixture<TempratureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempratureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TempratureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

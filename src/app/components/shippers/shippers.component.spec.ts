import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippersComponent } from './shippers.component';

describe('ShippersComponent', () => {
  let component: ShippersComponent;
  let fixture: ComponentFixture<ShippersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponentComponent } from './products.component';

describe('ProductsComponentComponent', () => {
  let component: ProductsComponentComponent;
  let fixture: ComponentFixture<ProductsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

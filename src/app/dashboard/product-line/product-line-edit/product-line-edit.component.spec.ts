import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductLineEditComponent} from './product-line-edit.component';

describe('ProductLineEditComponent', () => {
  let component: ProductLineEditComponent;
  let fixture: ComponentFixture<ProductLineEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductLineEditComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

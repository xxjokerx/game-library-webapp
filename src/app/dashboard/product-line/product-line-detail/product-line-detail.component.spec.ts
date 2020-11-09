import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductLineDetailComponent} from './product-line-detail.component';

describe('ProductLineDetailComponent', () => {
  let component: ProductLineDetailComponent;
  let fixture: ComponentFixture<ProductLineDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductLineDetailComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DescrptionHandlerComponent} from './descrption-handler.component';

describe('DescrptionHandlerComponent', () => {
  let component: DescrptionHandlerComponent;
  let fixture: ComponentFixture<DescrptionHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescrptionHandlerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescrptionHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

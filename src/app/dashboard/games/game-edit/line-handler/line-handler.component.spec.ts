import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LineHandlerComponent} from './line-handler.component';

describe('LineHandlerComponent', () => {
  let component: LineHandlerComponent;
  let fixture: ComponentFixture<LineHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LineHandlerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

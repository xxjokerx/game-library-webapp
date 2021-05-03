import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ThemeHandlerComponent} from './theme-handler.component';

describe('ThemeHandlerComponent', () => {
  let component: ThemeHandlerComponent;
  let fixture: ComponentFixture<ThemeHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemeHandlerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

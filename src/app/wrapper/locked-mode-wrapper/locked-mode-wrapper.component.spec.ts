import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LockedModeWrapperComponent} from './locked-mode-wrapper.component';

describe('LockedModeWrapperComponent', () => {
  let component: LockedModeWrapperComponent;
  let fixture: ComponentFixture<LockedModeWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LockedModeWrapperComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LockedModeWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

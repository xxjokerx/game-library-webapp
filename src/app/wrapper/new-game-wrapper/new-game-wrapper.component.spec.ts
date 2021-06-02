import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewGameWrapperComponent} from './new-game-wrapper.component';

describe('NewGameWrapperComponent', () => {
  let component: NewGameWrapperComponent;
  let fixture: ComponentFixture<NewGameWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewGameWrapperComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGameWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

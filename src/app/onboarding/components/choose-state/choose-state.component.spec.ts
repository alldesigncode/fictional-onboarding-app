import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseStateComponent } from './choose-state.component';

describe('ChooseStateComponent', () => {
  let component: ChooseStateComponent;
  let fixture: ComponentFixture<ChooseStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

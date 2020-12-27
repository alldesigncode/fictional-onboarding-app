import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCompanyComponent } from './choose-company.component';

describe('ChooseCompanyComponent', () => {
  let component: ChooseCompanyComponent;
  let fixture: ComponentFixture<ChooseCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

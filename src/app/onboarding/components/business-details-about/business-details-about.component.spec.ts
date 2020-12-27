import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDetailsAboutComponent } from './business-details-about.component';

describe('BusinessDetailsAboutComponent', () => {
  let component: BusinessDetailsAboutComponent;
  let fixture: ComponentFixture<BusinessDetailsAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessDetailsAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDetailsAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

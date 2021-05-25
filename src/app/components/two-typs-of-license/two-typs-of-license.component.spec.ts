import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoTypsOfLicenseComponent } from './two-typs-of-license.component';

describe('TwoTypsOfLicenseComponent', () => {
  let component: TwoTypsOfLicenseComponent;
  let fixture: ComponentFixture<TwoTypsOfLicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoTypsOfLicenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoTypsOfLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

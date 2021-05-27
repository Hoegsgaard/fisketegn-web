import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBrugerComponent } from './admin-bruger.component';

describe('AdminBrugerComponent', () => {
  let component: AdminBrugerComponent;
  let fixture: ComponentFixture<AdminBrugerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBrugerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBrugerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { buyLystfisketegnComponent } from './buyLystfisketegn.component';

describe('buyLystfisketegnComponent', () => {
  let component: buyLystfisketegnComponent;
  let fixture: ComponentFixture<buyLystfisketegnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ buyLystfisketegnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(buyLystfisketegnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

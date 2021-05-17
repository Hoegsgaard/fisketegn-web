import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyFritidsfisketegnComponent } from './buyFritidsfisketegn.component';

describe('BuyFritidsfisketegnComponent', () => {
  let component: BuyFritidsfisketegnComponent;
  let fixture: ComponentFixture<BuyFritidsfisketegnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyFritidsfisketegnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyFritidsfisketegnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

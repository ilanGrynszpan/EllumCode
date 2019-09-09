import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaturaPage } from './fatura.page';

describe('FaturaPage', () => {
  let component: FaturaPage;
  let fixture: ComponentFixture<FaturaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaturaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

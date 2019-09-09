import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoCreditoPage } from './novo-credito.page';

describe('NovoCreditoPage', () => {
  let component: NovoCreditoPage;
  let fixture: ComponentFixture<NovoCreditoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoCreditoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoCreditoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

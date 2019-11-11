import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstServicePage } from './first-service.page';

describe('FirstServicePage', () => {
  let component: FirstServicePage;
  let fixture: ComponentFixture<FirstServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstServicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

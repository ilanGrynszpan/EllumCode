import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBasicPage } from './login-basic.page';

describe('LoginBasicPage', () => {
  let component: LoginBasicPage;
  let fixture: ComponentFixture<LoginBasicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginBasicPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginBasicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

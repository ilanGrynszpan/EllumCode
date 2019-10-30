import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryBankPage } from './entry-bank.page';

describe('EntryBankPage', () => {
  let component: EntryBankPage;
  let fixture: ComponentFixture<EntryBankPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryBankPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryBankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

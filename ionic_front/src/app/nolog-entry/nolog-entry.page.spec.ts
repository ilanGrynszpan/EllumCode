import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NologEntryPage } from './nolog-entry.page';

describe('NologEntryPage', () => {
  let component: NologEntryPage;
  let fixture: ComponentFixture<NologEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NologEntryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NologEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

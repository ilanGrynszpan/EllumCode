import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryProfilePage } from './entry-profile.page';

describe('EntryProfilePage', () => {
  let component: EntryProfilePage;
  let fixture: ComponentFixture<EntryProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

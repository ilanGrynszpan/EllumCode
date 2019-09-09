import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarServicosPage } from './editar-servicos.page';

describe('EditarServicosPage', () => {
  let component: EditarServicosPage;
  let fixture: ComponentFixture<EditarServicosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarServicosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarServicosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

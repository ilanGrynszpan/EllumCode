import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosPendentesPage } from './pedidos-pendentes.page';

describe('PedidosPendentesPage', () => {
  let component: PedidosPendentesPage;
  let fixture: ComponentFixture<PedidosPendentesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosPendentesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosPendentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

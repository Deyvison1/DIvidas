/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DividasPagaComponent } from './dividasPaga.component';

describe('DividasPagaComponent', () => {
  let component: DividasPagaComponent;
  let fixture: ComponentFixture<DividasPagaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividasPagaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividasPagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

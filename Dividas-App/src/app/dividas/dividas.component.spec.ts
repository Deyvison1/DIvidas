/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DividasComponent } from './dividas.component';

describe('DividasComponent', () => {
  let component: DividasComponent;
  let fixture: ComponentFixture<DividasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

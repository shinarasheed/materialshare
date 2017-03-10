/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CoursemateComponent } from './coursemate.component';

describe('CoursemateComponent', () => {
  let component: CoursemateComponent;
  let fixture: ComponentFixture<CoursemateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursemateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursemateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSetsPage } from './tab-sets.page';

describe('TabSetsPage', () => {
  let component: TabSetsPage;
  let fixture: ComponentFixture<TabSetsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabSetsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCardsPage } from './tab-cards.page';

describe('TabCardsPage', () => {
  let component: TabCardsPage;
  let fixture: ComponentFixture<TabCardsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabCardsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabCardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

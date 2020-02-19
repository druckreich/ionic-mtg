import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WhatsTheColorComponent} from './whats-the-color.component';

describe('WhatsTheColorComponent', () => {
    let component: WhatsTheColorComponent;
    let fixture: ComponentFixture<WhatsTheColorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WhatsTheColorComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WhatsTheColorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

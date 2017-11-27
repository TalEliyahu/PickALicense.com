import { AppComponent } from './app.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', function () {
    let de: DebugElement;
    let el: HTMLElement;
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent ],
            imports: [HttpClientModule, HttpClientTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
    });

    it('should create component', () => expect(comp).toBeDefined() );

    it('should have beginning as the state', () => {
        expect(comp.state).toEqual('beginning');
    });

    it('should expect clickable link to start the process', () => {
        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('#start-button'));
        el = de.nativeElement;
        const startText = el.innerText;
        expect(startText).toMatch(/Ok, Let's start!/i);
    });
});

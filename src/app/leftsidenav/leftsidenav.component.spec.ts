import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftsidenavComponent } from './leftsidenav.component';

describe('LeftsidenavComponent', () => {
  let component: LeftsidenavComponent;
  let fixture: ComponentFixture<LeftsidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftsidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftsidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KrajComponent } from './kraj.component';

describe('KrajComponent', () => {
  let component: KrajComponent;
  let fixture: ComponentFixture<KrajComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KrajComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KrajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

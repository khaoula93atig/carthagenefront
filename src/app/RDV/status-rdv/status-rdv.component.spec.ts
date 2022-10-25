import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusRdvComponent } from './status-rdv.component';

describe('StatusRdvComponent', () => {
  let component: StatusRdvComponent;
  let fixture: ComponentFixture<StatusRdvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusRdvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

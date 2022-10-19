import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutNewsComponent } from './ajout-news.component';

describe('AjoutNewsComponent', () => {
  let component: AjoutNewsComponent;
  let fixture: ComponentFixture<AjoutNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

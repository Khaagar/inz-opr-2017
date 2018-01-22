import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectMapComponent } from './object-map.component';

describe('ObjectMapComponent', () => {
  let component: ObjectMapComponent;
  let fixture: ComponentFixture<ObjectMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

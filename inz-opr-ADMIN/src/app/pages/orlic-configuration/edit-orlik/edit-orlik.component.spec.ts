import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrlikComponent } from './edit-orlik.component';

describe('EditOrlikComponent', () => {
  let component: EditOrlikComponent;
  let fixture: ComponentFixture<EditOrlikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrlikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrlikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

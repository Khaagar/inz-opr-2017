import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrlikModalComponent } from './add-orlik-modal.component';

describe('AddOrlikModalComponent', () => {
  let component: AddOrlikModalComponent;
  let fixture: ComponentFixture<AddOrlikModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrlikModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrlikModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

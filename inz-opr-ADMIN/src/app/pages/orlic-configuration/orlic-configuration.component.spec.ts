import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrlicConfigurationComponent } from './orlic-configuration.component';

describe('OrlicConfigurationComponent', () => {
  let component: OrlicConfigurationComponent;
  let fixture: ComponentFixture<OrlicConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrlicConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrlicConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbtTestingComponent } from './mbt-testing.component';

describe('MbtTestingComponent', () => {
  let component: MbtTestingComponent;
  let fixture: ComponentFixture<MbtTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbtTestingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbtTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

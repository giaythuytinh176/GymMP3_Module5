import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotGuardComponent } from './not-guard.component';

describe('NotGuardComponent', () => {
  let component: NotGuardComponent;
  let fixture: ComponentFixture<NotGuardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotGuardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

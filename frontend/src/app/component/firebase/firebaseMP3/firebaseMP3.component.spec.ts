import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FirebaseMP3Component} from './firebaseMP3.component';

describe('FirebaseComponent', () => {
  let component: FirebaseMP3Component;
  let fixture: ComponentFixture<FirebaseMP3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FirebaseMP3Component]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseMP3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

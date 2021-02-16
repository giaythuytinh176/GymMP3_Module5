import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FirebaseCreateSongComponent} from './firebase.component';

describe('FirebaseComponent', () => {
  let component: FirebaseCreateSongComponent;
  let fixture: ComponentFixture<FirebaseCreateSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FirebaseCreateSongComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseCreateSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

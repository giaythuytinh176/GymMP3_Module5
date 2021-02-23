import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FirebaseEditProfileComponent} from './firebaseEditProfile.component';


describe('FirebaseEditProfileComponent', () => {
  let component: FirebaseEditProfileComponent;
  let fixture: ComponentFixture<FirebaseEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FirebaseEditProfileComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FirebaseUpdateSongComponent} from './firebaseUpdateSong.component';


describe('FirebaseUpdateSongComponent', () => {
  let component: FirebaseUpdateSongComponent;
  let fixture: ComponentFixture<FirebaseUpdateSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FirebaseUpdateSongComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseUpdateSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

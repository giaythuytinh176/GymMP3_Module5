import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FirebaseDialogAlbumComponent} from './firebaseDialogAlbum.component';


describe('FirebaseDialogAlbumComponent', () => {
  let component: FirebaseDialogAlbumComponent;
  let fixture: ComponentFixture<FirebaseDialogAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FirebaseDialogAlbumComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseDialogAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

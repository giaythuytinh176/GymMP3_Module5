import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FirebaseDialogSingerComponent} from './firebaseDialogSinger.component';


describe('FirebaseDialogSingerComponent', () => {
  let component: FirebaseDialogSingerComponent;
  let fixture: ComponentFixture<FirebaseDialogSingerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FirebaseDialogSingerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseDialogSingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FirebaseDialogCategoryComponent} from './firebaseDialogCategory.component';


describe('FirebaseDialogCategoryComponent', () => {
  let component: FirebaseDialogCategoryComponent;
  let fixture: ComponentFixture<FirebaseDialogCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FirebaseDialogCategoryComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseDialogCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

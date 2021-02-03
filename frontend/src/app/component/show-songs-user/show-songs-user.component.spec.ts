import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSongsUserComponent } from './show-songs-user.component';

describe('ShowSongsUserComponent', () => {
  let component: ShowSongsUserComponent;
  let fixture: ComponentFixture<ShowSongsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSongsUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSongsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

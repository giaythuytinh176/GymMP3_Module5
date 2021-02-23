import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogDeleteSongComponent} from './dialog-delete-song.component';

describe('DialogDeleteSongComponent', () => {
  let component: DialogDeleteSongComponent;
  let fixture: ComponentFixture<DialogDeleteSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogDeleteSongComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogDeleteSongOfPlaylistComponent} from './dialog-delete-song-of-playlist.component';

describe('DialogDeleteSongOfPlaylistComponent', () => {
  let component: DialogDeleteSongOfPlaylistComponent;
  let fixture: ComponentFixture<DialogDeleteSongOfPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogDeleteSongOfPlaylistComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteSongOfPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

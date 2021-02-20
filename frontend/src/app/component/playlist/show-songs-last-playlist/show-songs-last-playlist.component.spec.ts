import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSongsLastPlaylistComponent } from './show-songs-last-playlist.component';

describe('ShowSongsLastPlaylistComponent', () => {
  let component: ShowSongsLastPlaylistComponent;
  let fixture: ComponentFixture<ShowSongsLastPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSongsLastPlaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSongsLastPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

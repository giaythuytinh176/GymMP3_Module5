import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogCreateAlbumComponent} from './dialog-create-album.component';

describe('DialogCreateAlbumComponent', () => {
  let component: DialogCreateAlbumComponent;
  let fixture: ComponentFixture<DialogCreateAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogCreateAlbumComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SongLikeComponent} from './song-like.component';

describe('SongLikeComponent', () => {
  let component: SongLikeComponent;
  let fixture: ComponentFixture<SongLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SongLikeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

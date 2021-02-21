import { TestBed } from '@angular/core/testing';

import { SongLikeService } from './song-like.service';

describe('SongLikeService', () => {
  let service: SongLikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongLikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

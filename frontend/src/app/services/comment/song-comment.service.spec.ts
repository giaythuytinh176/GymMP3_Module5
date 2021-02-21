import {TestBed} from '@angular/core/testing';

import {SongCommentService} from './song-comment.service';

describe('SongCommentService', () => {
  let service: SongCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

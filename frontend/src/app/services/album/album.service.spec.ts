<<<<<<< HEAD
import {TestBed} from '@angular/core/testing';

import {AlbumService} from './album.service';
=======
import { TestBed } from '@angular/core/testing';

import { AlbumService } from './album.service';
>>>>>>> e69b538d68601004c425fe92b2324963dd22f113

describe('AlbumService', () => {
  let service: AlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

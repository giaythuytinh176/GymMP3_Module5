<<<<<<< HEAD
<<<<<<< HEAD
import {TestBed} from '@angular/core/testing';

import {AlbumService} from './album.service';
=======
import { TestBed } from '@angular/core/testing';

import { AlbumService } from './album.service';
>>>>>>> e69b538d68601004c425fe92b2324963dd22f113
=======
import {TestBed} from '@angular/core/testing';

import {AlbumService} from './album.service';
>>>>>>> b26a701020202ac5aa1f1ec9552bfc805380cd98

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

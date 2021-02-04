<<<<<<< HEAD
<<<<<<< HEAD
import {TestBed} from '@angular/core/testing';

import {SingerService} from './singer.service';
=======
import { TestBed } from '@angular/core/testing';

import { SingerService } from './singer.service';
>>>>>>> e69b538d68601004c425fe92b2324963dd22f113
=======
import {TestBed} from '@angular/core/testing';

import {SingerService} from './singer.service';
>>>>>>> b26a701020202ac5aa1f1ec9552bfc805380cd98

describe('SingerService', () => {
  let service: SingerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

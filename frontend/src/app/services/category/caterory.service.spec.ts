<<<<<<< HEAD
<<<<<<< HEAD
import {TestBed} from '@angular/core/testing';

import {CateroryService} from './caterory.service';
=======
import { TestBed } from '@angular/core/testing';

import { CateroryService } from './caterory.service';
>>>>>>> e69b538d68601004c425fe92b2324963dd22f113
=======
import {TestBed} from '@angular/core/testing';

import {CateroryService} from './caterory.service';
>>>>>>> b26a701020202ac5aa1f1ec9552bfc805380cd98

describe('CateroryService', () => {
  let service: CateroryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CateroryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

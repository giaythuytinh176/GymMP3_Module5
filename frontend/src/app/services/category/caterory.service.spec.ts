<<<<<<< HEAD
import {TestBed} from '@angular/core/testing';

import {CateroryService} from './caterory.service';
=======
import { TestBed } from '@angular/core/testing';

import { CateroryService } from './caterory.service';
>>>>>>> e69b538d68601004c425fe92b2324963dd22f113

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

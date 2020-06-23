import { TestBed } from '@angular/core/testing';

import { FirebaseProductStocksService } from './firebase-product-stocks.service';

describe('FirebaseProductStocksService', () => {
  let service: FirebaseProductStocksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseProductStocksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

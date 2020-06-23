import { TestBed } from '@angular/core/testing';

import { FirebaseWarehouseEntriesService } from './firebase-warehouse-entries.service';

describe('FirebaseWarehouseEntriesService', () => {
  let service: FirebaseWarehouseEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseWarehouseEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseEntriesTableComponent } from './warehouse-entries-table.component';

describe('WarehouseEntriesTableComponent', () => {
  let component: WarehouseEntriesTableComponent;
  let fixture: ComponentFixture<WarehouseEntriesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseEntriesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseEntriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

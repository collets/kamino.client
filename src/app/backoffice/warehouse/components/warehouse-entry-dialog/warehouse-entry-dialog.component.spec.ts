import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseEntryDialogComponent } from './warehouse-entry-dialog.component';

describe('WarehouseEntryDialogComponent', () => {
  let component: WarehouseEntryDialogComponent;
  let fixture: ComponentFixture<WarehouseEntryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseEntryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

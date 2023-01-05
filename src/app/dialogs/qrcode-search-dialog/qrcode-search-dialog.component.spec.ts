import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeSearchDialogComponent } from './qrcode-search-dialog.component';

describe('QrcodeSearchDialogComponent', () => {
  let component: QrcodeSearchDialogComponent;
  let fixture: ComponentFixture<QrcodeSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrcodeSearchDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrcodeSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

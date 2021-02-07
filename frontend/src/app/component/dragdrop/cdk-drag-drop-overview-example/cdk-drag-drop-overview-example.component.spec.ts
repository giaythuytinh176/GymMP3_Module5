import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdkDragDropOverviewExampleComponent } from './cdk-drag-drop-overview-example.component';

describe('CdkDragDropOverviewExampleComponent', () => {
  let component: CdkDragDropOverviewExampleComponent;
  let fixture: ComponentFixture<CdkDragDropOverviewExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdkDragDropOverviewExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdkDragDropOverviewExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

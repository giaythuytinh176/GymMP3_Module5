import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllListSongComponent } from './all-list-song.component';

describe('AllListSongComponent', () => {
  let component: AllListSongComponent;
  let fixture: ComponentFixture<AllListSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllListSongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllListSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

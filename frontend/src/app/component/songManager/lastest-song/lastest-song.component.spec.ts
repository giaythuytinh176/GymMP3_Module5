import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastestSongComponent } from './lastest-song.component';

describe('LastestSongComponent', () => {
  let component: LastestSongComponent;
  let fixture: ComponentFixture<LastestSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastestSongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastestSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

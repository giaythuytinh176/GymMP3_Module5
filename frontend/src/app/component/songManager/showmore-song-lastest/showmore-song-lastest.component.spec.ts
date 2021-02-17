import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowmoreSongLastestComponent } from './showmore-song-lastest.component';

describe('ShowmoreSongLastestComponent', () => {
  let component: ShowmoreSongLastestComponent;
  let fixture: ComponentFixture<ShowmoreSongLastestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowmoreSongLastestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowmoreSongLastestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

<<<<<<< HEAD
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UpdateSongComponent} from './update-song.component';
=======
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSongComponent } from './update-song.component';
>>>>>>> e69b538d68601004c425fe92b2324963dd22f113

describe('UpdateSongComponent', () => {
  let component: UpdateSongComponent;
  let fixture: ComponentFixture<UpdateSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< HEAD
      declarations: [UpdateSongComponent]
    })
      .compileComponents();
=======
      declarations: [ UpdateSongComponent ]
    })
    .compileComponents();
>>>>>>> e69b538d68601004c425fe92b2324963dd22f113
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

<<<<<<< HEAD
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShowSongsUserComponent} from './show-songs-user.component';
=======
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSongsUserComponent } from './show-songs-user.component';
>>>>>>> e69b538d68601004c425fe92b2324963dd22f113

describe('ShowSongsUserComponent', () => {
  let component: ShowSongsUserComponent;
  let fixture: ComponentFixture<ShowSongsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< HEAD
      declarations: [ShowSongsUserComponent]
    })
      .compileComponents();
=======
      declarations: [ ShowSongsUserComponent ]
    })
    .compileComponents();
>>>>>>> e69b538d68601004c425fe92b2324963dd22f113
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSongsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

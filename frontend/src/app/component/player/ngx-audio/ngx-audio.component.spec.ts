import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAudioComponent } from './ngx-audio.component';

describe('NgxAudioComponent', () => {
  let component: NgxAudioComponent;
  let fixture: ComponentFixture<NgxAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxAudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

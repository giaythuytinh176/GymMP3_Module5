import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogCreateSingerComponent} from './dialog-create-singer.component';

describe('DialogCreateSingerComponent', () => {
  let component: DialogCreateSingerComponent;
  let fixture: ComponentFixture<DialogCreateSingerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogCreateSingerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateSingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

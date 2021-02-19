import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListSingerComponent} from './list-singer.component';

describe('ListSingerComponent', () => {
  let component: ListSingerComponent;
  let fixture: ComponentFixture<ListSingerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListSingerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

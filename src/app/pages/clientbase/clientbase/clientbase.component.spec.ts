import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientbaseComponent } from './clientbase.component';

describe('ClientbaseComponent', () => {
  let component: ClientbaseComponent;
  let fixture: ComponentFixture<ClientbaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientbaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

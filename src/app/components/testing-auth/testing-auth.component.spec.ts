import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingAuthComponent } from './testing-auth.component';

describe('TestingAuthComponent', () => {
  let component: TestingAuthComponent;
  let fixture: ComponentFixture<TestingAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

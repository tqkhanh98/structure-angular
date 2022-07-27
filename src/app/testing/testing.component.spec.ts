import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthenticationService } from 'src/@core';

import { TestingComponent } from './testing.component';
import { TestingService } from './testing.service';

describe('TestingComponent', () => {
  let component: TestingComponent;
  let fixture: ComponentFixture<TestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestingComponent],
      providers: [{
        provide: AuthenticationService
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});

fdescribe('testiing f', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestingComponent],
      providers: [{ provide: TestingService }]
    }).compileComponents();
  })
  it('xoá space', () => {
    let service: TestingService = TestBed.get(TestingService);
    const text = 'testing works!';
    const excepted = 'testingworks!';
    const actual = service.removeSpace(text);
    expect(actual).toEqual(excepted);
  })
})

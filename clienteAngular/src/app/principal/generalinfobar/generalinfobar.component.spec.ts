import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralinfobarComponent } from './generalinfobar.component';

describe('GeneralinfobarComponent', () => {
  let component: GeneralinfobarComponent;
  let fixture: ComponentFixture<GeneralinfobarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralinfobarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralinfobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

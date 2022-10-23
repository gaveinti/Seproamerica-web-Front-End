import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoempresaComponent } from './infoempresa.component';

describe('InfoempresaComponent', () => {
  let component: InfoempresaComponent;
  let fixture: ComponentFixture<InfoempresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoempresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

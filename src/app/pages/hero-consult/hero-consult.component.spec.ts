import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroConsultComponent } from './hero-consult.component';

describe('HeroConsultComponent', () => {
  let component: HeroConsultComponent;
  let fixture: ComponentFixture<HeroConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroConsultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

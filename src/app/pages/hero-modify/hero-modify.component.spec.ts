import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroModifyComponent } from './hero-modify.component';

describe('HeroModifyComponent', () => {
  let component: HeroModifyComponent;
  let fixture: ComponentFixture<HeroModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroModifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

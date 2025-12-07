import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiCoreAngular } from './ui-core-angular';

describe('UiCoreAngular', () => {
  let component: UiCoreAngular;
  let fixture: ComponentFixture<UiCoreAngular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCoreAngular],
    }).compileComponents();

    fixture = TestBed.createComponent(UiCoreAngular);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

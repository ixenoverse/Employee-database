import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartOperationsComponent } from './chart-operations.component';


describe('ChartOperationsComponent', () => {
  let component: ChartOperationsComponent;
  let fixture: ComponentFixture<ChartOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartOperationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

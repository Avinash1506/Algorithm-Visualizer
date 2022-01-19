import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfindingVisualizerComponent } from './pathfinding-visualizer.component';

describe('PathfindingVisualizerComponent', () => {
  let component: PathfindingVisualizerComponent;
  let fixture: ComponentFixture<PathfindingVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathfindingVisualizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfindingVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {VisualizerComponent} from '../visualizer/visualizer.component';
@Component({
  selector: 'app-sorting-visualizer',
  templateUrl: './sorting-visualizer.component.html',
  styleUrls: ['./sorting-visualizer.component.css'],
})
export class AlgorithmVisualizerComponent implements OnInit {
  arrayData: number[] = [];
  sortingTechniques:string[] = ["Bubble Sort","Selection Sort","Insertion Sort","Merge Sort","Quick Sort","Heap Sort"];
  textOnButtons:string[] = ["Sort","New Array"];
  speed: number = 0;
  sortingTechniqueName: string = 'Bubble Sort';
  sort:number = -1;
  unblock:number = -1;
  blockHeaderVar:number = -1;
  @Output() newItemEvent = new EventEmitter<number[]>();
  @Output() blockEvent = new EventEmitter();
  @Output() unblockEvent = new EventEmitter();
  constructor(private vc:VisualizerComponent) {}

  ngOnInit(): void {}

  getArray(data: number[]) {
    this.arrayData = data;
    console.log('Helllloooo');
  }

  getSortingTechnique(sortName: string) {
    console.log("Sorting name: ",sortName);
    this.sortingTechniqueName = sortName;
  }

  getSpeed(speed: number) {
    this.speed = speed;
    this.vc.changeSpeed(this.speed);
  }
  sortArray() {
    console.log("Hello in sorting visualizer");
    this.sort = (this.sort + 1) % 2;
    this.blockHeaderVar = (this.blockHeaderVar + 1) % 2;
    console.log("blockNav");
    this.blockEvent.emit();
    // this.vc.sortArray(this.sortingTechniqueName);
  }
  unblockEventFunc() {
    this.unblock = (this.unblock + 1)%2;
    this.unblockEvent.emit();
  }

}

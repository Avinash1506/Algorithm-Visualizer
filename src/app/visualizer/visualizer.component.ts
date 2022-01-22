import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';

import { mergesortfunc } from '../algorithms/mergesortfile';
import { bubblesortfunc, bubblesorttest } from '../algorithms/bubblesortfile';
import {
  insertionsortfunc,
  insertionsortfunctest,
} from '../algorithms/insertionsortfile';
import {
  selectionsortfunc,
  selectionsortfunctest,
} from '../algorithms/selectionsortfile';
import { heapsortfunctest, heapsortfunc } from '../algorithms/heapsortfile';
import { quicksortfunc, quicksortfunctest } from '../algorithms/quicksortfile';
@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css'],
})
export class VisualizerComponent implements OnInit {
  @Input() arrayData: number[] = [];
  @Input() sortTech: string = '';
  @Input() speed: number = 0;
  @Input() sort: number = -1;
  @Output() unblockEvent = new EventEmitter();
  @ViewChild('boundary') boundary: ElementRef = {} as ElementRef;
  widthOfBar: number = 0;
  copyArray: number[] = [];
  color = '#48cae4';
  constructor(private elem: ElementRef) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.calculateBarWidth(this.arrayData.length);
    }, 0);
    
  }
  ngOnChanges(changes: SimpleChanges) {
    if('sort' in changes && changes['sort']['currentValue'] != -1) {
      this.sortArray();
    }
    else{
    this.calculateBarWidth(this.arrayData.length);
    this.changeBackgroundColor();
    }
  }

  ngAfterContentInit() {
  }

  //change the background color of the bars back to #48cae4
  changeBackgroundColor() {
    let arrayBars = this.elem.nativeElement.querySelectorAll('.elements');
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = '#48cae4';
    }
  }

  changeSpeed(speed: any) {
    this.speed = speed;
  }

  generateNewArray() {
    this.arrayData = [];
    let size = this.getRandomIntInclusive(4, 35);
    for (let i = 0; i < size; i++) {
      let x = this.getRandomIntInclusive(2, 32);
      this.arrayData.push(x);
    }
  }

  calculateBarWidth(noOfElements: number) {
    let widthOfBoundary;
    this.color = '#48cae4';
    if (this.boundary.nativeElement !== undefined) {
      widthOfBoundary = this.boundary.nativeElement.offsetWidth;
      widthOfBoundary -= 2 * noOfElements;
      this.widthOfBar = widthOfBoundary / noOfElements;
    }
  }

  sortArray() {
    if (this.speed == 0) {
      this.speed = 600;
    }
    let arrayBars = this.elem.nativeElement.querySelectorAll('.elements');
    this.initialize(arrayBars); // this will change the color of bars to initial color because they may have already been in other color or sorted
    this.copyArray = [];
    for(let i = 0; i < arrayBars.length; i++){
      this.copyArray[i] = +arrayBars[i]['innerText'];
    }
    if (this.sortTech == 'Bubble Sort') {
      this.bubbleSort(arrayBars);
    } else if (this.sortTech == 'Insertion Sort') {
      this.insertionSort(arrayBars);
    } else if (this.sortTech == 'Selection Sort') {
      this.selectionSort(arrayBars);
    } else if (this.sortTech == 'Merge Sort') {
      this.mergeSort(arrayBars);
    } else if (this.sortTech == 'Heap Sort') {
      this.heapSort(arrayBars);
    } else if (this.sortTech == 'Quick Sort') {
      this.quickSort(arrayBars);
    }
  }

  unblockElements() {
    this.unblockEvent.emit();
  }

  bubbleSort(arrayBars: any) {
    let copy1 = [...this.copyArray];
    let sortedArray1 = bubblesortfunc(this.copyArray, arrayBars, this.speed, this);
  }
  insertionSort(arrayBars: any) {
    insertionsortfunc(this.copyArray, arrayBars, this.speed, this);
  }
  selectionSort(arrayBars: any) {
    let sortedArray = selectionsortfunc(
      this.copyArray,
      arrayBars,
      this.speed,
      this.copyArray,
      this
    );
  }
  mergeSort(arrayBars: any) {
    mergesortfunc(this.copyArray, arrayBars, this.speed, this);
  }
  heapSort(arrayBars: any) {
    heapsortfunc(this.copyArray, arrayBars, this.speed, this);
  }
  quickSort(arrayBars: any) {
    quicksortfunc(this.copyArray, arrayBars, this.speed, this);
  }

  isEqual(array1: number[], array2: number[]): boolean {
    if (array1.length !== array2.length) return false;

    for (let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }

    return true;
  }

  test() {
    for (let i = 0; i <= 1000; i++) {
      let n = this.getRandomIntInclusive(5, 1000);
      let tmp_array: number[] = [];
      for (let i = 0; i < n; i++) {
        tmp_array.push(this.getRandomIntInclusive(5, 10000));
      }
      let sort1 = [...tmp_array];
      sort1.sort((a, b) => a - b);
      let sort2 = heapsortfunctest(tmp_array);
    }
  }

  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

  initialize(arrayBars:any) {
    for(let i=0;i<arrayBars.length;i++) {
      arrayBars[i].style.backgroundColor = '#48cae4';
    }
  }
}

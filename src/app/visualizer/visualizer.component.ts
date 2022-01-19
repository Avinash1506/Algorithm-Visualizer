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
    console.log('Hello in ngOnInit');

    console.log(this.widthOfBar);
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.calculateBarWidth(this.arrayData.length);
      console.log(this.widthOfBar);
    }, 0);
    
  }
  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes['sort']['currentValue']);
    console.log(changes);
    if('sort' in changes && changes['sort']['currentValue'] != -1) {
      this.sortArray();
    }
    else{
    // this.sortTech = changes['sortTech']['currentValue'];
    // console.log("sortTech: ",this.sortTech);
    console.log('In visualizer OnChanges');
    // this.arrayData = changes['']['currentValue'];
    console.log(this.arrayData);
    this.calculateBarWidth(this.arrayData.length);
    console.log(this.widthOfBar);
    // this.elem.nativeElement.querySelectorAll(
    //   '.elements'
    // ).style.backgroundColor = '#48cae4';
    this.changeBackgroundColor();
    }
    // if(changes['sort']['currentValue'] !== -1) {
    //   // console.log("Hello");
    //   this.sortArray();
    // }
  }

  ngAfterContentInit() {
    // this.calculateBarWidth(this.arrayData.length);
    // console.log(this.widthOfBar);
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
    console.log('Hello!');
    let size = this.getRandomIntInclusive(4, 35);
    for (let i = 0; i < size; i++) {
      let x = this.getRandomIntInclusive(2, 32);
      this.arrayData.push(x);
    }
  }

  calculateBarWidth(noOfElements: number) {
    console.log('Hello');
    let widthOfBoundary;
    this.color = '#48cae4';
    console.log(this.boundary);
    if (this.boundary.nativeElement !== undefined) {
      widthOfBoundary = this.boundary.nativeElement.offsetWidth;
      widthOfBoundary -= 2 * noOfElements;
      console.log('Boundary ', widthOfBoundary);
      this.widthOfBar = widthOfBoundary / noOfElements;
      // this.widthOfBar = Math.max(20, this.widthOfBar);
      console.log('Bar ', this.widthOfBar);
    }
  }

  sortArray() {
    console.log("HEllo");
    // this.sortTech = algoName;
    // this.arrayData = [5, 2, 6, 3, 1];
    if (this.speed == 0) {
      this.speed = 600;
    }
    let arrayBars = this.elem.nativeElement.querySelectorAll('.elements');
    console.log(arrayBars);
    this.initialize(arrayBars); // this will change the color of bars to initial color because they may have already been in other color or sorted
    // let i:number = 0;
    this.copyArray = [];
    for(let i = 0; i < arrayBars.length; i++){
      this.copyArray[i] = +arrayBars[i]['innerText'];
    }
    // this.copyArray = [...this.arrayData];
    // for(let val in arrayBars) {
    //   console.log(arrayBars[val]['innerText']);
    //   // this.arrayData[i++] = +val['innerText'];
    // }
    console.log("sorting tech is: ",this.sortTech);
    if (this.sortTech == 'Bubble Sort') {
      console.log("Hello");
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
    console.log(this.isEqual(sortedArray1, copy1));
    // this.test();
  }
  insertionSort(arrayBars: any) {
    console.log(this.arrayData);
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
    console.log(sortedArray);
  }
  mergeSort(arrayBars: any) {
    console.log(this.speed);
    console.log(this.copyArray);
    mergesortfunc(this.copyArray, arrayBars, this.speed, this);
    // console.log(animations);
    // console.log(this.arrayData);
    // let idx1: number, idx2: number, newHeight;
    // console.log(arrayBars);
    // for (let i = 0; i < animations.length; i++) {
    //   if (i % 3 !== 2) {
    //     setTimeout(() => {
    //       [idx1, idx2] = animations[i];
    //       if (i % 3 === 0) {
    //         console.log(
    //           arrayBars[idx1].innerHTML +
    //             ' ' +
    //             arrayBars[idx2].innerHTML +
    //             ' ' +
    //             idx1 +
    //             ' ' +
    //             idx2 +
    //             ' ' +
    //             i
    //         );
    //         console.log(animations[i]);
    //         arrayBars[idx1].style.backgroundColor = 'red';
    //         arrayBars[idx2].style.backgroundColor = 'red';
    //       } else {
    //         arrayBars[idx1].style.backgroundColor = 'green';
    //         arrayBars[idx2].style.backgroundColor = 'green';
    //       }
    //     }, i * 1000);
    //   } else {
    //     setTimeout(() => {
    //       // const [barOneIdx, newHeight] = animations[i];
    //       // const barOneStyle = arrayBars[barOneIdx].style;
    //       // barOneStyle.height = `${newHeight}px`;
    //       [idx1, newHeight] = animations[i];
    //       arrayBars[idx1].style.height = `${newHeight * 15}px`;
    //       arrayBars[idx1].innerHTML = `${newHeight}`;
    //     }, i * 1000);
    //   }
    // }
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
    // let sort2 = heapsortfunctest([2, 4, 1, 3, 5]);
    // console.log(sort2);
    for (let i = 0; i <= 1000; i++) {
      let n = this.getRandomIntInclusive(5, 1000);
      let tmp_array: number[] = [];
      for (let i = 0; i < n; i++) {
        tmp_array.push(this.getRandomIntInclusive(5, 10000));
      }
      let sort1 = [...tmp_array];
      sort1.sort((a, b) => a - b);
      let sort2 = heapsortfunctest(tmp_array);
      console.log(this.isEqual(sort1, sort2));
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

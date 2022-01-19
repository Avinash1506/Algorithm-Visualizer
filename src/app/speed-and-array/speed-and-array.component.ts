import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-speed-and-array',
  templateUrl: './speed-and-array.component.html',
  styleUrls: ['./speed-and-array.component.css'],
})
export class SpeedAndArrayComponent implements OnInit {
  constructor() {}
  size: number = 0;
  old:any;
  arrayElements: number[] = [];
  displayArray: string = '';
  // @ViewChild('speed') speed: ElementRef = {} as ElementRef;
  @Input() textOnButtons:string[] = [];
  @Input() blockedIndices:boolean[] = [];
  @Input() noOfRows = 15;
  @Input() noOfCols:number = 50; //
  @Input() block:number = 0;
  @Input() unblock:number = 0;
  @Input() idxArray:number[] = [];
  oldValue:any;
  @Input() sourceX:number = 0;
  @Input() sourceY:number = 0;
  @Input() destinationX:number = 0;
  @Input() destinationY:number = 0;
  disabledBool:boolean = false;
  @Output() myEvent = new EventEmitter();
  @Output() myEvent2 = new EventEmitter();
  @Output() myEvent3 = new EventEmitter();
  @Output() myEvent5 = new EventEmitter();
  @Output() myEvent10 = new EventEmitter();
  @Output() positionEvent = new EventEmitter();
  @ViewChild('container') container: ElementRef = {} as ElementRef;
  ngOnInit(): void {
    this.generateNew();
    // this.arrayElements = [3, 2, 1, 4];
    // this.myEvent.emit(this.arrayElements);
  }

  ngOnChanges(changes:SimpleChanges) {
    console.log(changes);
    if('idxArray' in changes && 'blockedIndices' in changes) {
      // this.sourceX = changes['idxArray']['currentValue'][0];
      // this.sourceY = changes['idxArray']['currentValue'][1];
      // this.destinationX = changes['idxArray']['currentValue'][2];
      // this.destinationY = changes['idxArray']['currentValue'][3];
      // this.blockedIndices = changes['blockedIndices']['currentValue'];
      // this.getDestinationYI();
    }
    // console.log(changes['block']['previousValue']);
    if('block' in changes && changes['block']['previousValue'] != undefined ) {
      console.log("Inside ngOnChanges");
      this.disabledBool = !this.disabledBool;
    }
    if('unblock' in changes && changes['unblock']['previousValue'] != undefined) {
      this.disabledBool = !this.disabledBool;
    }
  }

  getRndInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateNew() {
    if(this.textOnButtons[1] == "New Board") {
      console.log("Hello");
      this.myEvent10.emit();
    }
    else {
      this.displayArray = '';
      this.arrayElements = [];
      console.log('Hello!');

      let noOfElements:number = 4;
      if (this.container.nativeElement !== undefined) {
        let widthOfContainer = this.container.nativeElement.offsetWidth - 20;
        console.log(widthOfContainer);
        noOfElements= Math.floor(widthOfContainer / 21);
        // this.widthOfBar = Math.max(20, this.widthOfBar);
        console.log('No of elements ', noOfElements);
      }

      this.size = this.getRndInteger(4, noOfElements);
      // this.size = 53;
      for (let i = 0; i < this.size; i++) {
        let x = this.getRndInteger(2, 32);
        this.arrayElements.push(x);
        this.displayArray += i == this.size - 1 ? x : x + ',';
      }
      console.log(this.displayArray);
      this.myEvent.emit(this.arrayElements);
    }
    // this.myEvent.emit(this.arrayElements);
  }

  changeSpeed(speedFromFE:any) {
    // console.log(this.speed.nativeElement);
    // let speed = this.speed.nativeElement.value;
    console.log(speedFromFE);
    let speed = 10 - (speedFromFE.value - 1)
    speed *= 100;
    this.myEvent2.emit(speed);
  }

  formatLabel(value: number) {
    return value;
  }

  disableEnable(){
    this.disabledBool = !this.disabledBool;
  }

  solve() { 
    this.disableEnable();
    console.log("Hello in sortArray");
    this.myEvent3.emit();
  }

  getSourceX(val:any, old:any) {
    this.sourceX = +val.target.value;
    // if(this.sourceX == undefined) {
    //   this.sourceX = +old;
    // }
    let posArray:any = [this.sourceX, this.sourceY, this.destinationX, this.destinationY];
    let idx1:number = (+this.sourceX)*(+this.noOfCols) + (+this.sourceY);
    let idx2:number = this.destinationX*+this.noOfCols + this.destinationY;
    if(this.blockedIndices[idx1] || this.sourceX < 0 || this.sourceX >= this.noOfRows || idx1 == idx2) {
      this.sourceX = +old;
    }
    else{
      this.positionEvent.emit(posArray);
    }
  }

  getSourceY(val:any, old:any) {
    this.sourceY = +val.target.value;
    // if(this.sourceY == undefined) {
    //   this.sourceY = +old;
    // }
    let posArray:any = [this.sourceX, this.sourceY, this.destinationX, this.destinationY];
    let idx1:number = (+this.sourceX)*(+this.noOfCols) + (+this.sourceY);
    let idx2:number = this.destinationX*+this.noOfCols + this.destinationY;
    console.log(idx1);
    if(this.blockedIndices[idx1] || this.sourceY < 0 || this.sourceY >= this.noOfCols || idx1 == idx2) {
      this.sourceY = +old;
    }
    else{
      this.positionEvent.emit(posArray);
    }
    // console.log(this.sourceY);
    // let posArray:any = [this.sourceX, this.sourceY, this.destinationX, this.destinationY];
    // this.positionEvent.emit(posArray);
  }

  getDestinationX(val:any, old:any) {
    this.destinationX = +val.target.value;
    let posArray:any = [this.sourceX, this.sourceY, this.destinationX, this.destinationY];
    let idx1:number = (+this.sourceX)*(+this.noOfCols) + (+this.sourceY);
    let idx2:number = (+this.destinationX)*(+this.noOfCols) + (+this.destinationY);
    if(this.blockedIndices[idx2] || this.destinationX < 0 || this.destinationX >= this.noOfRows || idx1 == idx2) {
      this.destinationX = +old;
    }
    else{
      this.positionEvent.emit(posArray);
    }
    /*
    this.destinationX = +val;
    console.log(this.destinationX);
    let posArray:any = [this.sourceX, this.sourceY, this.destinationX, this.destinationY];
    this.positionEvent.emit(posArray);
    */
  }

  getDestinationY(val:any, old:any) {
    this.destinationY = +val.target.value;
    if(this.destinationY == undefined) {
      console.log("Hello in destination y");
      this.destinationY = +old;
    }
    let posArray:any = [this.sourceX, this.sourceY, this.destinationX, this.destinationY];
    let idx1:number = (+this.sourceX)*(+this.noOfCols) + (+this.sourceY);
    let idx2:number = this.destinationX*+this.noOfCols + this.destinationY;
    if(this.blockedIndices[idx2] || this.destinationY < 0 || this.destinationY >= this.noOfCols || idx1 == idx2) {
      this.destinationY = +old;
    }
    else{
      this.positionEvent.emit(posArray);
    }
  }

  // getDestinationYI(){
  //   return this.destinationY;
  // }
}

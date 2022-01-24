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
    setTimeout(()=>{
      this.generateNew();
    }, 0);
  }

  ngOnChanges(changes:SimpleChanges) {
    if('idxArray' in changes && 'blockedIndices' in changes) {
    }
    if('block' in changes && changes['block']['previousValue'] != undefined ) {
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
      this.myEvent10.emit();
    }
    else {
      this.displayArray = '';
      this.arrayElements = [];

      let noOfElements:number = 4;
      if (this.container.nativeElement !== undefined) {
        let widthOfContainer = this.container.nativeElement.offsetWidth - 20;
        noOfElements= Math.floor(widthOfContainer / 21);
      }

      this.size = this.getRndInteger(4, noOfElements);
      for (let i = 0; i < this.size; i++) {
        let x = this.getRndInteger(2, 32);
        this.arrayElements.push(x);
        this.displayArray += i == this.size - 1 ? x : x + ',';
      }
      this.myEvent.emit(this.arrayElements);
    }
  }

  changeSpeed(speedFromFE:any) {
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
    this.myEvent3.emit();
  }

  isNum(num:string) {
    for(let i=0;i<num.length;i++) {
      if(!(num[i] >= '0' && num[i] <= '9')) {
        return false;
      }
    }

    return true;
  }

  getSourceX(val:any, old:any) {
    let flag:boolean = this.isNum(val.target.value);
    this.sourceX = +val.target.value;
    let posArray:any = [this.sourceX, this.sourceY, this.destinationX, this.destinationY];
    let idx1:number = (+this.sourceX)*(+this.noOfCols) + (+this.sourceY);
    let idx2:number = this.destinationX*+this.noOfCols + this.destinationY;
    if(this.blockedIndices[idx1] || this.sourceX < 0 || this.sourceX >= this.noOfRows || idx1 == idx2 || !flag) {
      this.sourceX = +old;
    }
    else{
      this.positionEvent.emit(posArray);
    }
  }

  getSourceY(val:any, old:any) {
    let flag:boolean = this.isNum(val.target.value);
    this.sourceY = +val.target.value;
    let posArray:any = [this.sourceX, this.sourceY, this.destinationX, this.destinationY];
    let idx1:number = (+this.sourceX)*(+this.noOfCols) + (+this.sourceY);
    let idx2:number = this.destinationX*+this.noOfCols + this.destinationY;
    if(this.blockedIndices[idx1] || this.sourceY < 0 || this.sourceY >= this.noOfCols || idx1 == idx2 || !flag) {
      this.sourceY = +old;
    }
    else{
      this.positionEvent.emit(posArray);
    }
  }

  getDestinationX(val:any, old:any) {
    let flag:boolean = this.isNum(val.target.value);
    this.destinationX = +val.target.value;
    let posArray:any = [this.sourceX, this.sourceY, this.destinationX, this.destinationY];
    let idx1:number = (+this.sourceX)*(+this.noOfCols) + (+this.sourceY);
    let idx2:number = (+this.destinationX)*(+this.noOfCols) + (+this.destinationY);
    if(this.blockedIndices[idx2] == true || this.destinationX < 0 || this.destinationX >= this.noOfRows || idx1 == idx2 || !flag) {
      this.destinationX = +old;
    }
    else{
      this.positionEvent.emit(posArray);
    }
  }

  getDestinationY(val:any, old:any) {
    let flag:boolean = this.isNum(val.target.value);
    this.destinationY = +val.target.value;
    if(this.destinationY == undefined) {
      this.destinationY = +old;
    }
    let posArray:any = [this.sourceX, this.sourceY, this.destinationX, this.destinationY];
    let idx1:number = (+this.sourceX)*(+this.noOfCols) + (+this.sourceY);
    let idx2:number = this.destinationX*+this.noOfCols + this.destinationY;
    if(this.blockedIndices[idx2] || this.destinationY < 0 || this.destinationY >= this.noOfCols || idx1 == idx2 || !flag) {
      this.destinationY = +old;
    }
    else{
      this.positionEvent.emit(posArray);
    }
  }
}

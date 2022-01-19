import { Component, OnInit, Input,Output, EventEmitter, SimpleChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  // sorting: string = 'merge';
  @Input() algorithms:string[] = [];
  @Input() algoType:string = '';
  @Input() algoName:string='Bubble Sort';
  @Input() blockHeaderVar:number = 0;
  @Input() unblock:number = 0;
  blockHeader:boolean = false;
  @Output() myEvent1 = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    // this.sort('merge');
    this.getAlgo(this.algoName, 1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if('blockHeaderVar' in changes && changes['blockHeaderVar']['previousValue']!=undefined) {
      this.blockHeader = true;
    }
    if('unblock' in changes && changes['unblock']['previousValue'] != undefined && changes['unblock']['currentValue']!=-1) {
      this.blockHeader = false;
    }
  } 
  // sort(sortingTechnique: string) {
  //   console.log('Hello' + sortingTechnique);
  //   this.sorting = sortingTechnique;
  //   console.log(sortingTechnique);
  //   this.myEvent1.emit(this.sorting);
  // }
  getAlgo(algo:any, type:number){
    if(type == 1) {
      this.algoName = algo;
      console.log("Algo name in header ", this.algoName);
      this.myEvent1.emit(this.algoName);
    }
    else{
      this.algoName = algo['tab']['textLabel'];
      this.myEvent1.emit(this.algoName);
    }
    console.log(algo);
    
  }

  // blockHeader(){

  // }
}

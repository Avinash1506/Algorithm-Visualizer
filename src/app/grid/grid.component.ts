import { Component, OnInit,Input, SimpleChanges } from '@angular/core';
import {node} from '../interfaceForNode';
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() rowno:number=0;
  @Input() colno:number=0;
  @Input() start:[number,number]=[0,0];
  @Input() end:[number,number]=[0,0];
  row:number=0;
  col:number=0;
  isStart:boolean=false;
  isEnd:boolean=false;
  isVisited:number=0;
  distance:number=1000000000;
  constructor() { }

  ngOnInit(): void {
    if(this.rowno==this.start[0] && this.colno==this.start[1]){
      this.isStart=true;
    }
    if(this.rowno==this.end[0] && this.colno==this.end[1]){
      this.isEnd=true;
    }
  }
  ngAfterViewInit():void{
    if(this.rowno==this.start[0] && this.colno==this.start[1]){
      this.isStart=true;
    }
    if(this.rowno==this.end[0] && this.colno==this.end[1]){
      this.isEnd=true;
    }
  }
  ngOnChanges(changes: SimpleChanges){
    if(this.rowno==this.start[0] && this.colno==this.start[1]){
      this.isStart=true;
    }
    if(this.rowno==this.end[0] && this.colno==this.end[1]){
      this.isEnd=true;
    }
  }

}

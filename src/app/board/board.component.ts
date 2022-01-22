import { Component, OnInit,Input,ElementRef, SimpleChanges, Output, EventEmitter,ViewChild } from '@angular/core';
import { bfs, bfs_test } from '../pathfinding_algorithms/bfs';
import { dfs, dfs_test } from '../pathfinding_algorithms/dfs';
import { dijkstra, dijkstra_test } from '../pathfinding_algorithms/dijkstra';
import { astar, astar_test } from '../pathfinding_algorithms/astar';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  @Input() algoName:string = '';
  @Input() generateNew: number = 0;
  @Input() visualizeAlgo: number = 0;
  @Input() posArray:number[] = [];
  @Output() blockedEvent = new EventEmitter();
  @Output() blockedEvent1 = new EventEmitter();
  @Input() speed:number = 0;
  @Output() startAndEndIdxEvent = new EventEmitter();
  @Output() startAndEndIdxAndBlockedEvent = new EventEmitter();
  @ViewChild('board') board: ElementRef = {} as ElementRef;
  @ViewChild('appgrid') appgrid: ElementRef = {} as ElementRef;
  arr:number[] = [];
  rows: number[] = [];
  columns: number[] = [];
  noOfRows:number = 15;
  noOfCols:number = 50;
  startIdx:[number,number] = [0,0];
  endIdx:[number,number] = [0,0];
  blockedIndices:boolean[] = [];
  dijValues:number[] = [];
  constructor(private elem:ElementRef) {}

  ngOnInit(): void {
      this.rows = [];
      this.columns = [];
      this.arr = [];
      for (let i = 0; i < this.noOfRows; i++) {
        this.rows.push(i);
      }
      for (let i = 0; i < this.noOfCols ; i++) {
        this.columns.push(i);
      }
      for(let i = 0; i < this.noOfCols; i++) {
        this.arr[i] = i;
      }
  }

  ngAfterViewInit(){
    setTimeout(()=>{
      this.noOfCols = this.calculateNoOfCols();
      this.rows = [];
      this.columns = [];
      this.arr = [];
      for (let i = 0; i < this.noOfRows; i++) {
        this.rows.push(i);
      }
      for (let i = 0; i < this.noOfCols ; i++) {
        this.columns.push(i);
      }
      for(let i = 0; i < this.noOfCols; i++) {
        this.arr.push(i);
      }
    }, 0);
    setTimeout(()=>{
      this.generateNewBoard();
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges) {
    if('algoName' in changes) {
      setTimeout(()=>{
        if(changes['algoName']['currentValue'] == 'Dijkstra') { 
          this.dijValues = this.generateWeights();
        }
        else {
          this.removeWeights();
        }
      }, 0);
    }
    if('generateNew' in changes && changes['generateNew']['previousValue'] != undefined) {
      setTimeout(()=>{
        this.generateNewBoard();
        if(this.algoName == 'Dijkstra') {
          this.dijValues = this.generateWeights();
        }
      }, 0);
    } 

    else{
      if('visualizeAlgo' in changes && changes['visualizeAlgo']['previousValue'] != undefined) {
        let idx:number = 0;
        this.visualize(this.dijValues);
      }
      if('posArray' in changes && changes['posArray']['firstChange'] != true) {
        let arrayBlocks = this.elem.nativeElement.querySelectorAll('.blocks');
        this.clearBoard(arrayBlocks);
        let startIdxPrev = this.startIdx;
        let endIdxPrev = this.endIdx;
        this.startIdx = [+changes['posArray']['currentValue'][0], +changes['posArray']['currentValue'][1]];
        this.endIdx = [+changes['posArray']['currentValue'][2], +changes['posArray']['currentValue'][3]];
        this.changeSourceAndDestination(this.startIdx, this.endIdx, startIdxPrev, endIdxPrev);
      }
    }
  }
  
  generateWeights() {
    let dijValues:number[] = [];
    let idx:number = 0;
    let collectionOfRows:any = this.appgrid['nativeElement']['childNodes'];
    for(let i=0;i<collectionOfRows.length - 1; i++) {
      let collectionOfCols:any = collectionOfRows[i]['childNodes'];
      for(let j = 2; j < collectionOfCols.length - 1; j++) {
        if(this.appgrid['nativeElement']['childNodes'][i]['childNodes'][j] != [] && this.blockedIndices[idx] == false)  {
            let val:number= this.getRandomInt(1,100);
            this.appgrid['nativeElement']['childNodes'][i]['childNodes'][j]['innerHTML'] = val;
            dijValues.push(val);
        }
        else if(this.appgrid['nativeElement']['childNodes'][i]['childNodes'][j] != [] && this.blockedIndices[idx] == true) {
          this.appgrid['nativeElement']['childNodes'][i]['childNodes'][j]['innerHTML'] = '';
          dijValues.push(1000000000);
        }
        idx++;
      }
    }

    return dijValues;
  }

  removeWeights() {
    let idx:number = 0;
    this.dijValues = [];
    let collectionOfRows:any = this.appgrid['nativeElement']['childNodes'];
    for(let i=0;i<collectionOfRows.length - 1; i++) {
      let collectionOfCols:any = collectionOfRows[i]['childNodes'];
      for(let j = 2; j < collectionOfCols.length - 1; j++) {
        if(this.appgrid['nativeElement']['childNodes'][i]['childNodes'][j] != [] && this.blockedIndices[idx] == false)  {
            this.appgrid['nativeElement']['childNodes'][i]['childNodes'][j]['innerHTML'] = '';
        }
        idx++;
      }
    }
  }

  changeSourceAndDestination(startIdx:number[], endIdx:number[], startIdxPrev:number[], endIdxPrev:number[]) {
    let arrayBlocks = this.elem.nativeElement.querySelectorAll('.blocks');
    let idx1:number = startIdxPrev[0]*+this.noOfCols + startIdxPrev[1];
    let idx2:number = endIdxPrev[0]*+this.noOfCols + endIdxPrev[1];
    arrayBlocks[idx1].style.backgroundColor="white";
    arrayBlocks[idx2].style.backgroundColor="white";
    idx1 = startIdx[0]*+this.noOfCols + startIdx[1];
    arrayBlocks[idx1].style.backgroundColor="#ef476f";
    idx2 = endIdx[0]*+this.noOfCols + endIdx[1];
    arrayBlocks[idx2].style.backgroundColor="#ffd166";
  }

  blockEventFunc(){
    this.blockedEvent.emit();
  }

  visualize(arr:number[]){
    if(this.speed == 0) {
      this.speed = 600;
    }
    let arrayBlocks = this.elem.nativeElement.querySelectorAll('.blocks');
    this.clearBoard(arrayBlocks);
    if(this.algoName == 'BFS'){
      bfs(this.startIdx[0], this.startIdx[1], this.endIdx[0], this.endIdx[1], this.noOfRows, this.noOfCols, arrayBlocks, this.blockedIndices, this.speed, this);
    }
    else if(this.algoName == 'DFS'){
      dfs(this.startIdx[0], this.startIdx[1], this.endIdx[0], this.endIdx[1], this.noOfRows, this.noOfCols, arrayBlocks, this.blockedIndices, this.speed, this);
    }
    else if(this.algoName == 'A Star')
      astar(this.startIdx[0], this.startIdx[1], this.endIdx[0], this.endIdx[1], this.noOfRows, this.noOfCols, arrayBlocks, this.blockedIndices, this.speed, this);
    else if(this.algoName == 'Dijkstra'){
      dijkstra(this.startIdx[0], this.startIdx[1], this.endIdx[0], this.endIdx[1], this.noOfRows, this.noOfCols, arrayBlocks, this.blockedIndices, this.speed, this, arr);
    }
  }

  getBlockedIndices(){
    let vis:boolean[][] = [];
    let row = [];
    let blockedIndices:boolean[] = [];
    for(let j=0;j<this.noOfCols;j++){
      row.push(false);
    }
    for(let i=0;i<this.noOfRows;i++){
      vis.push(row);
    }

    for(let i=0;i<this.noOfRows*this.noOfCols;i++) {
      this.blockedIndices[i] = false;
    }

    let x = this.noOfCols;
    while(x--) {
      while(1) {
        let xtmp = this.getRandomInt(0,this.noOfRows);
        let ytmp = this.getRandomInt(0,this.noOfCols);
        if(vis[xtmp][ytmp] == false && !(xtmp == this.startIdx[0] && ytmp==this.startIdx[1]) && !(xtmp == this.endIdx[0] && ytmp==this.endIdx[1]) ) {
          vis[xtmp][ytmp] = true;
          let updatedIndex = xtmp*this.noOfCols + ytmp;
          this.blockedIndices[updatedIndex] = true;
          break;
        }
      }
    }
  }

  generateNewBoard(){
    let arrayBlocks = this.elem.nativeElement.querySelectorAll('.blocks');

    let idx:number = this.startIdx[0]*this.noOfCols + this.startIdx[1];
    arrayBlocks[idx].style.backgroundColor = 'white';
    idx = this.endIdx[0]*this.noOfCols + this.endIdx[1];
    arrayBlocks[idx].style.backgroundColor = 'white';

    this.startIdx[0] = this.getRandomInt(0, this.noOfRows);
    this.startIdx[1] = this.getRandomInt(0, this.noOfCols);
    while(1) {
      this.endIdx[0] = this.getRandomInt(0, this.noOfRows);
      this.endIdx[1] = this.getRandomInt(0, this.noOfCols);
      if(this.startIdx[0] != this.endIdx[0] && this.startIdx[1] != this.endIdx[1]) {
        break;
      }
    }
    
    idx = this.startIdx[0]*this.noOfCols + this.startIdx[1];
    arrayBlocks[idx].style.backgroundColor = '#ef476f';
    idx = this.endIdx[0]*this.noOfCols + this.endIdx[1];
    arrayBlocks[idx].style.backgroundColor = '#ffd166';

    this.getBlockedIndices();

    this.startAndEndIdxAndBlockedEvent.emit([this.startIdx[0], this.startIdx[1], this.endIdx[0], this.endIdx[1], this.blockedIndices]);
    
    for(let i = 0 ; i < this.noOfRows*this.noOfCols; i++) {
      if(arrayBlocks[i].style.backgroundColor != 'rgb(239, 71, 111)' && arrayBlocks[i].style.backgroundColor != 'rgb(255, 209, 102)'){
        arrayBlocks[i].style.backgroundColor = 'white';
      }
      if(this.blockedIndices[i]){
        arrayBlocks[i].style.backgroundColor = "#111111";
      }
    }
  }

  getRandomInt(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // max exclusive 
  }

  clearBoard(arrayBlocks:any) {
    for(let i=0;i<arrayBlocks.length;i++) {
      if(arrayBlocks[i].style.backgroundColor == 'rgb(239, 71, 111)' || arrayBlocks[i].style.backgroundColor == 'rgb(255, 209, 102)') {

      }
      else if(arrayBlocks[i].style.backgroundColor == 'rgb(137, 26, 69)' || arrayBlocks[i].style.backgroundColor == 'rgb(72, 202, 228)') { 
        arrayBlocks[i].style.backgroundColor = 'white';
      }

      if(i == this.startIdx[0]*this.noOfCols+this.startIdx[1]) {
        arrayBlocks[i].style.backgroundColor = '#ef476f';
      }
      if(i == this.endIdx[0]*this.noOfCols+this.endIdx[1]) {
        arrayBlocks[i].style.backgroundColor = '#ffd166';
      }
    }
  }

  calculateNoOfCols(){
    let width:number = 0;
    if(this.board.nativeElement !== undefined) {
      width = this.board.nativeElement.offsetWidth;
      width -= 40;
      width -= 5;
      width = Math.floor(width / 22);
    }

    return width;
  }
}

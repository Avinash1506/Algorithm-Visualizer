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
  arr:number[] = [];
  rows: number[] = [];
  columns: number[] = [];
  noOfRows:number = 15;
  noOfCols:number = 50;
  startIdx:[number,number] = [5,5];
  endIdx:[number,number] = [5,10];
  blockedIndices:boolean[] = [];
  constructor(private elem:ElementRef) {}

  ngOnInit(): void {
    // setTimeout(()=>{
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
    // }, 0);
    
    // this.startIdx = [5, 35];
    // this.endIdx = [11, 15];
    //generate indices which should be blocked
    // this.blockedIndices = this.getBlockedIndices();
  }

  ngAfterViewInit(){
    setTimeout(()=>{
      this.noOfCols = this.calculateNoOfCols();
      console.log(this.noOfCols);
      this.rows = [];
      this.columns = [];
      this.arr = [];
      // this.noOfCols = this.calculateNoOfCols();
      console.log(this.noOfCols);
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
      this.generateNewBoard('first');
    }, 0);
    // this.rows = [];
    // setTimeout(()=>{
    //   this.rows = [];
    //   this.columns = [];
    //   this.arr = [];
    //   this.noOfCols = this.calculateNoOfCols();
    //   console.log(this.noOfCols);
    //   for (let i = 0; i < this.noOfRows; i++) {
    //     this.rows.push(i);
    //   }
    //   for (let i = 0; i < this.noOfCols ; i++) {
    //     this.columns.push(i);
    //   }
    //   for(let i = 0; i < this.noOfCols; i++) {
    //     this.arr.push(i);
    //   }
    // }, 0);
    // this.columns = [];
    // this.arr = [];
    // this.noOfCols = this.calculateNoOfCols();
    // console.log(this.noOfCols);
    // for (let i = 0; i < this.noOfRows; i++) {
    //   this.rows.push(i);
    // }
    // for (let i = 0; i < this.noOfCols ; i++) {
    //   this.columns.push(i);
    // }
    // for(let i = 0; i < this.noOfCols; i++) {
    //   this.arr.push(i);
    // }
    // this.startIdx = [5, 35];
    // this.endIdx = [11, 15];
    // let arrayBlocks = this.elem.nativeElement.querySelectorAll('.blocks');
    // console.log(arrayBlocks);
    // let idx:number = this.startIdx[0]*this.noOfCols + this.startIdx[1];
    // console.log(idx);
    // arrayBlocks[idx].style.backgroundColor="#ef476f";
    // idx = this.endIdx[0]*this.noOfCols + this.endIdx[1];
    // arrayBlocks[idx].style.backgroundColor="#ffd166";
    // for(let i = 0 ; i <= 15*50; i++) {
    //   // let idx:number = this.blockedIndices[i];
    //   if(this.blockedIndices[i]){
    //     arrayBlocks[i].style.backgroundColor = "black";
    //   }
    // }
    // colors the indices which should be blocked with black color
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if('generateNew' in changes && changes['generateNew']['previousValue'] != undefined) {
      setTimeout(()=>{
        this.generateNewBoard('second');
      }, 0);
      console.log("Hello");
    } 

    else{
      if('visualizeAlgo' in changes && changes['visualizeAlgo']['previousValue'] != undefined) {
        this.visualize();
      }
      if('posArray' in changes && changes['posArray']['firstChange'] != true) {
        let arrayBlocks = this.elem.nativeElement.querySelectorAll('.blocks');
        this.clearBoard(arrayBlocks);
        console.log(changes);
        let startIdxPrev = [+changes['posArray']['previousValue'][0], +changes['posArray']['previousValue'][1]];
        let endIdxPrev = [+changes['posArray']['previousValue'][2], +changes['posArray']['previousValue'][3]];
        this.startIdx = [+changes['posArray']['currentValue'][0], +changes['posArray']['currentValue'][1]];
        this.endIdx = [+changes['posArray']['currentValue'][2], +changes['posArray']['currentValue'][3]];
        this.changeSourceAndDestination(this.startIdx, this.endIdx, startIdxPrev, endIdxPrev);
        // let arrayBlocks = this.elem.nativeElement.querySelectorAll('.blocks');
        // let idx:number = this.startIdx[0]*this.noOfCols + this.startIdx[1];
        // console.log(idx);
        // // arrayBlocks[idx].style.backgroundColor="red";
        // idx = this.endIdx[0]*this.noOfCols + this.endIdx[1];
        // arrayBlocks[idx].style.backgroundColor="blue";
      }
    }
  }
  
  changeSourceAndDestination(startIdx:number[], endIdx:number[], startIdxPrev:number[], endIdxPrev:number[]) {
    let arrayBlocks = this.elem.nativeElement.querySelectorAll('.blocks');
    let idx1:number = startIdxPrev[0]*+this.noOfCols + startIdxPrev[1];
    let idx2:number = endIdxPrev[0]*+this.noOfCols + endIdxPrev[1];
    console.log(idx1);
    arrayBlocks[idx1].style.backgroundColor="white";
    arrayBlocks[idx2].style.backgroundColor="white";
    idx1 = startIdx[0]*+this.noOfCols + startIdx[1];
    console.log(idx1);
    arrayBlocks[idx1].style.backgroundColor="#ef476f";
    idx2 = endIdx[0]*+this.noOfCols + endIdx[1];
    arrayBlocks[idx2].style.backgroundColor="#ffd166";
  }

  blockEventFunc(){
    this.blockedEvent.emit();
    console.log("Hello in method");
  }

  visualize(){
    if(this.speed == 0) {
      this.speed = 600;
    }
    let arrayBlocks = this.elem.nativeElement.querySelectorAll('.blocks');
    this.clearBoard(arrayBlocks);
    // console.log(arrayBlocks);
    // for(let i = 0; i < this.noOfRows*this.noOfCols; i++){
    //   arrayBlocks[i].style.backgroundColor = "skyblue";
    // }
    console.log(this.startIdx[0],this.startIdx[1]);
    // console.log(arrayBlocks);
    console.log(this.algoName);
    if(this.algoName == 'BFS'){
      // this.blockedEvent.emit();
      console.log(bfs(this.startIdx[0], this.startIdx[1], this.endIdx[0], this.endIdx[1], this.noOfRows, this.noOfCols, arrayBlocks, this.blockedIndices, this.speed, this));
    }
    else if(this.algoName == 'DFS'){
      console.log("Hello in dfs");
      let x = dfs(this.startIdx[0], this.startIdx[1], this.endIdx[0], this.endIdx[1], this.noOfRows, this.noOfCols, arrayBlocks, this.blockedIndices, this.speed, this);
      console.log(x);
    }
    else if(this.algoName == 'a*')
      // astar(this.startIdx[0], this.startIdx[1], this.endIdx[0], this.endIdx[1], this.noOfRows, this.noOfCols, arrayBlocks, this.blockedIndices, 500);
      astar(this.startIdx[0], this.startIdx[1], this.endIdx[0], this.endIdx[1], this.noOfRows, this.noOfCols, arrayBlocks, this.blockedIndices, this.speed);
    // else if(this.algoName == 'dijkstra'){
    //   dijkstra(this.startIdx[0], this.startIdx[1], this.endIdx[0], this.endIdx[1], this.noOfRows, this.noOfCols, arrayBlocks, this.blockedIndices, 500);
    // }
    // else if(this.algoName == 'astar'){

    // }
  }

  getBlockedIndices(){
    let vis:boolean[][] = [];
    let row = [];
    let blockedIndices:boolean[] = [];
    for(let j=0;j<this.noOfCols;j++){
      // blockedIndices.push(false);
      row.push(false);
    }
    for(let i=0;i<this.noOfRows;i++){
      // blockedIndices.push(false);
      vis.push(row);
    }

    for(let i=0;i<this.noOfRows*this.noOfCols;i++) {
      blockedIndices[i] = false;
    }

    let x = this.noOfCols;
    while(x--) {
      while(1) {
        let xtmp = this.getRandomInt(0,this.noOfRows);
        let ytmp = this.getRandomInt(0,this.noOfCols);
        if(vis[xtmp][ytmp] == false && !(xtmp == this.startIdx[0] && ytmp==this.startIdx[1]) && !(xtmp == this.endIdx[0] && ytmp==this.endIdx[1]) ) {
          vis[xtmp][ytmp] = true;
          let updatedIndex = xtmp*this.noOfCols + ytmp;
          // blockedIndices.push(updatedIndex);
          blockedIndices[updatedIndex] = true;
          break;
        }
      }
    }

    return blockedIndices;
  }

  generateNewBoard(str:string){
    // let i:number = 0;
    // let j:number = 0;
    let arrayBlocks = this.elem.nativeElement.querySelectorAll('.blocks');
    console.log(arrayBlocks.length);
    // for(let i = 0 ; i <= 15*50; i++) {
    //   // let idx:number = this.blockedIndices[i];
    //   if(arrayBlocks[i].style.backgroundColor != 'red' && arrayBlocks[i].style.backgroundColor != 'blue'){
    //     arrayBlocks[i].style.backgroundColor = 'white';
    //   }
    // }
    let idx:number = this.startIdx[0]*this.noOfCols + this.startIdx[1];
    arrayBlocks[idx].style.backgroundColor = 'white';
    idx = this.endIdx[0]*this.noOfCols + this.endIdx[1];
    arrayBlocks[idx].style.backgroundColor = 'white';

    // console.log(arrayBlocks);
    this.startIdx[0] = this.getRandomInt(0, this.noOfRows);
    this.startIdx[1] = this.getRandomInt(0, this.noOfCols);
    while(1) {
      this.endIdx[0] = this.getRandomInt(0, this.noOfRows);
      this.endIdx[1] = this.getRandomInt(0, this.noOfCols);
      if(this.startIdx[0] != this.endIdx[0] && this.startIdx[1] != this.endIdx[1]) {
        break;
      }
    }
    // if(str == 'first')
    // this.startAndEndIdxEvent.emit([this.startIdx[0], this.startIdx[1], this.endIdx[0], this.endIdx[1]]);
    idx = this.startIdx[0]*this.noOfCols + this.startIdx[1];
    arrayBlocks[idx].style.backgroundColor = '#ef476f';
    idx = this.endIdx[0]*this.noOfCols + this.endIdx[1];
    arrayBlocks[idx].style.backgroundColor = '#ffd166';

    this.blockedIndices = this.getBlockedIndices();
    this.startAndEndIdxAndBlockedEvent.emit([this.startIdx[0], this.startIdx[1], this.endIdx[0], this.endIdx[1], this.blockedIndices]);
    // this.blockedEvent1.emit(this.blockedIndices);
    
    for(let i = 0 ; i < this.noOfRows*this.noOfCols; i++) {
      // let idx:number = this.blockedIndices[i];
      if(arrayBlocks[i].style.backgroundColor != 'rgb(239, 71, 111)' && arrayBlocks[i].style.backgroundColor != 'rgb(255, 209, 102)'){
        console.log(arrayBlocks[i].style.backgroundColor);
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
      // console.log(arrayBlocks[i].style.backgroundColor);
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
      console.log(width / 22);
      width = Math.floor(width / 22);
      // console.log(width);

    }

    return width;
  }
}

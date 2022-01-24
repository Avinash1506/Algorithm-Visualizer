import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pathfinding-visualizer',
  templateUrl: './pathfinding-visualizer.component.html',
  styleUrls: ['./pathfinding-visualizer.component.css']
})
export class PathfindingVisualizerComponent implements OnInit {
  blockedIndices:boolean[] = [];
  idxArray:number[] = [];
  startAndEndIdxArray:number[] = [];
  speed:number = 0;
  posArray:number[] = [5, 35, 11, 15];
  generateNew:number = -1;
  visualize:number = -1;
  block:number = -1;
  pathFindingTechniques:string[] = ["bfs","dfs","dijkstra"];
  textOnButtons:string[] = ["Visualize", "New Board"];
  algoName:string = '';
  unblock:number = -1;
  blockHeaderVar:number = -1;
  @Output() blockEvent = new EventEmitter();
  @Output() unblockEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  getPathfindingAlgoName(algoName:string){
    this.algoName = algoName;
  }

  posDetails(posArray:number[]) {
    this.posArray = posArray;
  }
  
  startVisualizing(){
    this.blockHeaderVar = (this.blockHeaderVar + 1) % 2;
    this.visualize = (this.visualize + 1)  % 2;
    this.blockEvent.emit();
  }

  generateNewBoard() {
      this.generateNew = (this.generateNew + 1)  % 2;
  }

  getSpeed(speed:number) {
    this.speed = speed;
  }

  blockElements(){
    this.block = (this.block + 1)  % 2;
    this.unblock = (this.unblock + 1)%2;
    this.unblockEvent.emit();
  }

  startAndEndIdxAndBlockedEvent(idxAndBlockedArray:any) {
    this.idxArray = [idxAndBlockedArray[0], idxAndBlockedArray[1], idxAndBlockedArray[2], idxAndBlockedArray[3]];
    this.startAndEndIdxArray = [idxAndBlockedArray[4], idxAndBlockedArray[5]];
    this.blockedIndices = idxAndBlockedArray[6];
  }
}

import { Component, ElementRef, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';
import {Router, ActivatedRoute, NavigationStart} from '@angular/router';
import {AlgorithmVisualizerComponent} from './sorting-visualizer/sorting-visualizer.component';
import {PathfindingVisualizerComponent} from'./pathfinding-visualizer/pathfinding-visualizer.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AlgorithmVisualizer';
  isSortOrPath:boolean = true;
  disabledEnable:boolean = false;
  isVisible:boolean = false;
  @ViewChild('sort') sort: ElementRef = {} as ElementRef;
  @ViewChild('pathfind') pathfind: ElementRef = {} as ElementRef;
  @ViewChild('nav') nav: any = {} as ElementRef;
  @ViewChild('click') click: ElementRef = {} as ElementRef;
  @ViewChild('divElem') divElem: ElementRef = {} as ElementRef;
  // arrayData: number[] = [];
  // speed: number = 0;
  // sortingTechniqueName: string = '';
  // getArray(data: number[]) {
  //   this.arrayData = data;
  // }
  // getSortingTechnique(sortName: string) {
  //   this.sortingTechniqueName = sortName;
  // }

  // getSpeed(speed: number) {
  //   this.speed = speed;
  // }
  constructor(private router: Router) {
    console.log(this.router.url);
    
  }

  ngOnInit() {
    console.log(this.router.url);
    this.router.events.subscribe(event =>{
      if (event instanceof NavigationStart){
         console.log(event.url)
         this.routerChangeMethod(event.url);
      }
   })

  //  this.blockUnblock(undefined);
  }

  routerChangeMethod(url:any){
    this.title = url;
    if(url == '/sorting-visualizer' || url == '/pathfinding-visualizer') {
      this.isSortOrPath = false;
    }
    else{
      this.isSortOrPath = true;
    }
    console.log(url);
  }

  blockNav(){
    console.log("block nav");
    this.disabledEnable = true;
  }

  unblockNav(){
    this.disabledEnable = false;
  }

  blockUnblock(componentRef:any){
    if(!(componentRef instanceof AlgorithmVisualizerComponent) && !(componentRef instanceof PathfindingVisualizerComponent)) {
      return;
    }
    console.log("In blockUnblock");
    if(componentRef instanceof AlgorithmVisualizerComponent) {
      const sorting: AlgorithmVisualizerComponent = componentRef;
      sorting.blockEvent.subscribe(()=>{
        console.log("Inside block");
        this.disabledEnable = true;
      })
      sorting.unblockEvent.subscribe(()=>{
        this.disabledEnable = false;
      })
    }

    if(componentRef instanceof PathfindingVisualizerComponent) {
      const pathfinding: PathfindingVisualizerComponent = componentRef;
      pathfinding.blockEvent.subscribe(()=>{
        console.log("Inside block");
        this.disabledEnable = true;
      })
      pathfinding.unblockEvent.subscribe(()=>{
        this.disabledEnable = false;
      })
    } 
  }

  openOrClose(){
    console.log(this.sort['nativeElement']['classList']);
    if(this.search('makeVertical',this.sort['nativeElement']['classList'])) {
      console.log("Hello");
      this.sort['nativeElement']['classList'].remove("makeVertical");
      this.pathfind['nativeElement']['classList'].remove("makeVertical");
      this.nav['_elementRef']['nativeElement']['classList'].remove("changeHeight");
    }
    else {
      // this.sort['nativeElement']['classList'].add("changeHeight");
      console.log(this.nav);
      this.nav['_elementRef']['nativeElement']['classList'].add("changeHeight");
      this.sort['nativeElement']['classList'].add("makeVertical");
      this.pathfind['nativeElement']['classList'].add("makeVertical");
      this.sort['nativeElement']['classList'].add("leftDis");
      this.pathfind['nativeElement']['classList'].add("leftDis");
      // this.divElem['nativeElement']['classList'].remove("makeRight");
      this.divElem['nativeElement'].style.float = "none";
      // this.click['nativeElement']['classList'].add("iconDis");
      // this.pathfind['nativeElement']['classList'].add("changeHeight");
    }
  }

  search(str:string, arr:any) {
    for(let val of arr) {
      if(val == str) return true;
    }

    return false;
  }
  // changeURL() {
  //   console.log(this.router.url);
  //   if(this.router.url == '/sorting-visualizer') {
  //     console.log("sorting");
  //   }
  //   else if(this.router.url == '/pathfinding-visualizer') {
  //     console.log("pathfinding");
  //   }
  //   else{
  //     console.log("Home");
  //   }
  // }
  // ngOnChanges() {
  //   this.router.url;
  // }
}

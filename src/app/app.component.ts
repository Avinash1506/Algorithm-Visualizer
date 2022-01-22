import { Component, ElementRef, ViewChild } from '@angular/core';
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
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(event =>{
      if (event instanceof NavigationStart){
         this.routerChangeMethod(event.url);
      }
   })
  }

  routerChangeMethod(url:any){
    this.title = url;
    if(url == '/sorting-visualizer' || url == '/pathfinding-visualizer') {
      this.isSortOrPath = false;
    }
    else{
      this.isSortOrPath = true;
    }
  }

  blockNav(){
    this.disabledEnable = true;
  }

  unblockNav(){
    this.disabledEnable = false;
  }

  blockUnblock(componentRef:any){
    if(!(componentRef instanceof AlgorithmVisualizerComponent) && !(componentRef instanceof PathfindingVisualizerComponent)) {
      return;
    }
    if(componentRef instanceof AlgorithmVisualizerComponent) {
      const sorting: AlgorithmVisualizerComponent = componentRef;
      sorting.blockEvent.subscribe(()=>{
        this.disabledEnable = true;
      })
      sorting.unblockEvent.subscribe(()=>{
        this.disabledEnable = false;
      })
    }

    if(componentRef instanceof PathfindingVisualizerComponent) {
      const pathfinding: PathfindingVisualizerComponent = componentRef;
      pathfinding.blockEvent.subscribe(()=>{
        this.disabledEnable = true;
      })
      pathfinding.unblockEvent.subscribe(()=>{
        this.disabledEnable = false;
      })
    } 
  }

  openOrClose(){
    if(this.search('makeVertical',this.sort['nativeElement']['classList'])) {
      this.sort['nativeElement']['classList'].remove("makeVertical");
      this.pathfind['nativeElement']['classList'].remove("makeVertical");
      this.nav['_elementRef']['nativeElement']['classList'].remove("changeHeight");
    }
    else {
      this.nav['_elementRef']['nativeElement']['classList'].add("changeHeight");
      this.sort['nativeElement']['classList'].add("makeVertical");
      this.pathfind['nativeElement']['classList'].add("makeVertical");
      this.sort['nativeElement']['classList'].add("leftDis");
      this.pathfind['nativeElement']['classList'].add("leftDis");
      this.divElem['nativeElement'].style.float = "none";
    }
  }

  search(str:string, arr:any) {
    for(let val of arr) {
      if(val == str) return true;
    }

    return false;
  }
}

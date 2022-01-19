import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  @Output() emitVisualize = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  visualizeAlgo(){
    this.emitVisualize.emit();
  }
}

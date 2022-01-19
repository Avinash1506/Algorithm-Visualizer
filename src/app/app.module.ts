import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SpeedAndArrayComponent } from './speed-and-array/speed-and-array.component';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { HomeComponent } from './home/home.component';
import { AlgorithmVisualizerComponent } from './sorting-visualizer/sorting-visualizer.component';
import { PathfindingVisualizerComponent } from './pathfinding-visualizer/pathfinding-visualizer.component';
import { GridComponent } from './grid/grid.component';
import { BoardComponent } from './board/board.component';
import { OptionsComponent } from './options/options.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BoldTextPipe } from './bold-text.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SpeedAndArrayComponent,
    VisualizerComponent,
    HomeComponent,
    AlgorithmVisualizerComponent,
    PathfindingVisualizerComponent,
    GridComponent,
    BoardComponent,
    OptionsComponent,
    BoldTextPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatTabsModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule
  ],
  providers: [VisualizerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

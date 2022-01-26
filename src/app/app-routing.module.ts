import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PathfindingVisualizerComponent } from './pathfinding-visualizer/pathfinding-visualizer.component';
import { AlgorithmVisualizerComponent } from './sorting-visualizer/sorting-visualizer.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'sorting-visualizer', component: AlgorithmVisualizerComponent },
  {
    path: 'pathfinding-visualizer',
    component: PathfindingVisualizerComponent,
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true,onSameUrlNavigation:'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

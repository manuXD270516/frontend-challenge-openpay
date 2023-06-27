import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CharactersComponent } from './components/characters/characters.component';
import { LogsComponent } from './components/logs/logs.component';

const routes: Routes = [
  { path: 'characters', component: CharactersComponent },
  { path: 'logs', component: LogsComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
  { path: '**', component: CharactersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

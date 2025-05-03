import type { Route } from '@angular/router';
import { LoginComponent }  from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GameComponent }   from './game/game.component';
import { StatsComponent }  from './stats/stats.component';

export const routes: Route[] = [
  { path: 'login',    component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'game',     component: GameComponent },
  { path: 'stats',    component: StatsComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
